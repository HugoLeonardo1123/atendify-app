export interface AvailableTime {
  status: string;
  start_time: string;
  end_time?: string;
  scheduling_url: string;
  date?: string;
}

export interface EventType {
  uri: string;
  name: string;
  active: boolean;
  slug: string;
  color: string;
  custom_questions: any[];
  description_html: string;
  description_plain: string;
  duration: number;
  kind: string;
  pooling_type: string;
  type: string;
  scheduling_url: string;
  secret: boolean;
}

export interface ScheduledEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  location?: {
    type: string;
    location?: string;
  };
  cancellation?: {
    canceled_by: string;
    reason: string;
  };
  invitees_counter: {
    active: number;
    limit: number;
    total: number;
  };
  created_at: string;
  updated_at: string;
}

export interface AvailabilityItem {
  uri: string;
  name: string;
  user: string;
  default: boolean;
  timezone: string;
  rules: Array<{
    type: string;
    wday?: number;
    intervals?: Array<{
      from: string;
      to: string;
    }>;
    date?: string;
  }>;
}

export interface MarkedDates {
  [date: string]: MultiDotMarking & {
    selected?: boolean;
    selectedColor?: string;
  };
}

export interface DateData {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
}

export interface CalendarDot {
  key: string;
  color: string;
}

export interface MultiDotMarking {
  dots?: CalendarDot[];
  selected?: boolean;
  selectedColor?: string;
}
