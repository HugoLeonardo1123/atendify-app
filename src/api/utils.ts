import { AvailableTime, ScheduledEvent } from './types';

export const groupAvailableTimesByDate = (
  availableTimes: AvailableTime[],
): Record<string, AvailableTime[]> => {
  const groupedTimes: Record<string, AvailableTime[]> = {};

  availableTimes.forEach((time) => {
    const date = time.start_time.split('T')[0];
    if (!groupedTimes[date]) {
      groupedTimes[date] = [];
    }
    groupedTimes[date].push(time);
  });

  return groupedTimes;
};

export const groupEventsByDate = (
  events: ScheduledEvent[],
): Record<string, ScheduledEvent[]> => {
  const groupedEvents: Record<string, ScheduledEvent[]> = {};

  events.forEach((event) => {
    const date = event.start_time.split('T')[0];
    if (!groupedEvents[date]) {
      groupedEvents[date] = [];
    }
    groupedEvents[date].push(event);
  });

  return groupedEvents;
};

export const formatTime = (isoTime: string): string => {
  try {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return isoTime;
  }
};

export const formatEventTime = (event: ScheduledEvent): string => {
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  const formatTimeString = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return `${formatTimeString(startTime)} - ${formatTimeString(endTime)}`;
};

export const isTimeSlotAvailable = (
  timeSlot: { start_time: string; end_time?: string },
  scheduledEvents: ScheduledEvent[],
): boolean => {
  const startTime = new Date(timeSlot.start_time);
  const endTime = timeSlot.end_time
    ? new Date(timeSlot.end_time)
    : new Date(startTime.getTime() + 30 * 60 * 1000);

  return !scheduledEvents.some((event) => {
    const eventStart = new Date(event.start_time);
    const eventEnd = new Date(event.end_time);

    return (
      (startTime >= eventStart && startTime < eventEnd) ||
      (endTime > eventStart && endTime <= eventEnd) ||
      (startTime <= eventStart && endTime >= eventEnd)
    );
  });
};

export const prepareBookedCalendarMarkedDates = (
  groupedEvents: Record<string, ScheduledEvent[]>,
) => {
  const markedDates: Record<string, { marked: boolean; dots?: any[] }> = {};

  Object.keys(groupedEvents).forEach((date) => {
    markedDates[date] = {
      marked: true,
      dots: [
        {
          key: 'booked',
          color: 'red',
          selectedDotColor: 'red',
        },
      ],
    };
  });

  return markedDates;
};

export const combineCalendarData = (
  availableTimes: Record<string, any[]>,
  scheduledEvents: Record<string, ScheduledEvent[]>,
) => {
  const combinedData: Record<
    string,
    {
      available: any[];
      booked: ScheduledEvent[];
    }
  > = {};

  Object.keys(availableTimes).forEach((date) => {
    if (!combinedData[date]) {
      combinedData[date] = {
        available: [],
        booked: [],
      };
    }
    combinedData[date].available = availableTimes[date];
  });

  Object.keys(scheduledEvents).forEach((date) => {
    if (!combinedData[date]) {
      combinedData[date] = {
        available: [],
        booked: [],
      };
    }
    combinedData[date].booked = scheduledEvents[date];
  });

  return combinedData;
};

export const prepareCalendarMarkedDates = (
  availableDates: string[],
  bookedDates: string[],
  selectedDate?: string,
) => {
  const markedDates: Record<string, any> = {};

  availableDates.forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: '#50cebb',
      dots: [{ key: 'available', color: '#50cebb' }],
      selected: date === selectedDate,
      selectedColor: date === selectedDate ? '#4f9cbd' : undefined,
    };
  });

  bookedDates.forEach((date) => {
    if (markedDates[date]) {
      if (!markedDates[date].dots) {
        markedDates[date].dots = [];
      }
      markedDates[date].dots.push({ key: 'booked', color: '#ff6b6b' });
    } else {
      markedDates[date] = {
        marked: true,
        dots: [{ key: 'booked', color: '#ff6b6b' }],
        selected: date === selectedDate,
        selectedColor: date === selectedDate ? '#4f9cbd' : undefined,
      };
    }
  });

  return markedDates;
};
