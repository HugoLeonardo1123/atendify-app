import axios from 'axios';
import { Linking } from 'react-native';
import { CALENDLY_TOKEN, CALENDLY_USER_URI, BASE_URL } from '@env';
import {
  AvailabilityItem,
  AvailableTime,
  EventType,
  ScheduledEvent,
} from './types';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${CALENDLY_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchEventTypes = async (): Promise<EventType[]> => {
  try {
    if (!CALENDLY_USER_URI) {
      throw new Error('CALENDLY_USER_URI not defined in environment');
    }

    const response = await api.get('/event_types', {
      params: { user: CALENDLY_USER_URI },
    });

    return response.data.collection || [];
  } catch (error: any) {
    console.error(
      'Error fetching event types:',
      error.response?.data || error.message,
    );
    return [];
  }
};

export const getUserAvailability = async (): Promise<AvailabilityItem[]> => {
  try {
    const response = await api.get('/user_availability_schedules', {
      params: { user: CALENDLY_USER_URI },
    });

    return response.data.collection || [];
  } catch (error: any) {
    console.error(
      'Error fetching user availability:',
      error.response?.data || error.message,
    );
    return [];
  }
};

export const fetchAvailableTimes = async (
  eventTypeUri: string,
  daysToFetch: number = 30,
): Promise<AvailableTime[]> => {
  try {
    if (!eventTypeUri) {
      throw new Error('eventTypeUri not provided');
    }

    const now = new Date();
    now.setHours(now.getHours() + 1);

    const maxEndDate = new Date(now);
    maxEndDate.setDate(now.getDate() + daysToFetch);

    const allAvailableTimes: AvailableTime[] = [];
    let currentStartDate = new Date(now);

    while (currentStartDate < maxEndDate) {
      const currentEndDate = new Date(currentStartDate);
      currentEndDate.setDate(currentStartDate.getDate() + 6);

      if (currentEndDate > maxEndDate) {
        currentEndDate.setTime(maxEndDate.getTime());
      }

      const batchStartTimeISO = currentStartDate.toISOString();
      const batchEndTimeISO = `${
        currentEndDate.toISOString().split('T')[0]
      }T23:59:59Z`;

      try {
        const response = await api.get('/event_type_available_times', {
          params: {
            event_type: eventTypeUri,
            start_time: batchStartTimeISO,
            end_time: batchEndTimeISO,
          },
        });

        if (response.data.collection) {
          allAvailableTimes.push(...response.data.collection);
        }
      } catch (error: any) {
        console.error(
          `Error fetching times batch:`,
          error.response?.data || error.message,
        );
      }

      currentStartDate.setDate(currentStartDate.getDate() + 7);
    }

    return allAvailableTimes;
  } catch (error: any) {
    console.error(
      'Error fetching available times:',
      error.response?.data || error.message,
    );
    return [];
  }
};

export const fetchScheduledEvents = async (
  daysInPast: number = 7,
  daysInFuture: number = 30,
): Promise<ScheduledEvent[]> => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysInPast);
    const startTimeISO = startDate.toISOString();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + daysInFuture);
    const endTimeISO = endDate.toISOString();

    const response = await api.get('/scheduled_events', {
      params: {
        user: CALENDLY_USER_URI,
        min_start_time: startTimeISO,
        max_start_time: endTimeISO,
        status: 'active',
      },
    });

    return response.data.collection || [];
  } catch (error: any) {
    console.error(
      'Error fetching scheduled events:',
      error.response?.data || error.message,
    );
    return [];
  }
};

export const fetchEventsByEmail = async (
  email: string,
  daysInPast: number = 7,
  daysInFuture: number = 30,
): Promise<ScheduledEvent[]> => {
  try {
    if (!email) {
      throw new Error('Email not provided');
    }

    const allEvents = await fetchScheduledEvents(daysInPast, daysInFuture);
    if (allEvents.length === 0) return [];

    const userEvents: ScheduledEvent[] = [];

    for (const event of allEvents) {
      try {
        const eventId = event.uri.split('/').pop();
        const eventDetailsResponse = await api.get(
          `/scheduled_events/${eventId}/invitees`,
        );
        const invitees = eventDetailsResponse.data.collection || [];

        const hasMatchingEmail = invitees.some(
          (invitee: any) =>
            invitee.email?.toLowerCase() === email.toLowerCase(),
        );

        if (hasMatchingEmail) {
          userEvents.push(event);
        }
      } catch (detailError: any) {
        console.error(
          `Error fetching event details:`,
          detailError.response?.data || detailError.message,
        );
      }
    }

    return userEvents;
  } catch (error: any) {
    console.error(
      'Error fetching events by email:',
      error.response?.data || error.message,
    );
    return [];
  }
};

export const cancelScheduledEvent = async (
  eventUri: string,
  cancelReason: string = 'Cancelled by user',
): Promise<boolean> => {
  try {
    if (!eventUri) {
      throw new Error('Event URI not provided');
    }

    await api.post(`${eventUri}/cancellation`, { reason: cancelReason });

    return true;
  } catch (error: any) {
    console.error(
      'Error cancelling event:',
      error.response?.data || error.message,
    );
    return false;
  }
};

export const scheduleMeeting = async (
  schedulingUrl: string,
  name: string,
  email: string,
  questions_and_answers: Array<{ question: string; answer: string }> = [],
): Promise<boolean> => {
  try {
    if (!schedulingUrl || !schedulingUrl.includes('calendly.com')) {
      throw new Error('Invalid scheduling URL');
    }

    const urlObj = new URL(schedulingUrl);

    urlObj.searchParams.append('name', name);
    urlObj.searchParams.append('email', email);

    if (questions_and_answers.length > 0) {
      const additionalInfo = questions_and_answers
        .map((qa) => `${qa.question}: ${qa.answer}`)
        .join('; ');

      urlObj.searchParams.append('a1', additionalInfo);
    }

    const finalUrl = urlObj.toString();
    await Linking.openURL(finalUrl);

    return true;
  } catch (error: any) {
    console.error('Error redirecting to scheduling:', error.message);
    return false;
  }
};
