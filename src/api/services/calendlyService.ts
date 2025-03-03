import calendlyAPI from '../config/calendlyApi';
import {
  CalendlyUser,
  CalendlyEvent,
  CalendlyEventType,
  CalendlySchedulingLink,
  CalendlyWebhook,
  CalendlyResponse,
} from '../types/calendly';

export const getEvents = async (
  params: Record<string, any> = {},
): Promise<CalendlyResponse<CalendlyEvent>> => {
  try {
    const response = await calendlyAPI.get<CalendlyResponse<CalendlyEvent>>(
      '/scheduled_events',
      { params },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventDetails = async (
  eventUuid: string,
): Promise<CalendlyResponse<CalendlyEvent>> => {
  try {
    const response = await calendlyAPI.get<CalendlyResponse<CalendlyEvent>>(
      `/scheduled_events/${eventUuid}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<CalendlyUser> => {
  try {
    const response = await calendlyAPI.get<CalendlyUser>('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const getUserEventTypes = async (
  userUri: string,
): Promise<CalendlyResponse<CalendlyEventType>> => {
  try {
    const response = await calendlyAPI.get<CalendlyResponse<CalendlyEventType>>(
      '/event_types',
      {
        params: { user: userUri },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching event types:', error);
    throw error;
  }
};

interface SchedulingLinkOptions {
  owner_type?: string;
  max_event_count?: number;
}

export const createSchedulingLink = async (
  eventTypeUuid: string,
  data: SchedulingLinkOptions = {},
): Promise<CalendlyResponse<CalendlySchedulingLink>> => {
  try {
    const response = await calendlyAPI.post<
      CalendlyResponse<CalendlySchedulingLink>
    >(`/scheduling_links`, {
      max_event_count: 1,
      owner: `https://api.calendly.com/event_types/${eventTypeUuid}`,
      owner_type: 'EventType',
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating scheduling link:', error);
    throw error;
  }
};

interface WebhookData {
  url: string;
  events: string[];
  organization?: string;
  user?: string;
  scope?: string;
}

export const createWebhook = async (
  data: WebhookData,
): Promise<CalendlyResponse<CalendlyWebhook>> => {
  try {
    const payload = {
      url: data.url,
      events: data.events,
      organization: data.organization,
      user: data.user,
      scope: data.scope || 'user',
    };

    const response = await calendlyAPI.post<CalendlyResponse<CalendlyWebhook>>(
      '/webhook_subscriptions',
      payload,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating webhook:', error);
    throw error;
  }
};

export const listWebhooks = async (): Promise<
  CalendlyResponse<CalendlyWebhook>
> => {
  try {
    const response = await calendlyAPI.get<CalendlyResponse<CalendlyWebhook>>(
      '/webhook_subscriptions',
    );
    return response.data;
  } catch (error) {
    console.error('Error listing webhooks:', error);
    throw error;
  }
};
