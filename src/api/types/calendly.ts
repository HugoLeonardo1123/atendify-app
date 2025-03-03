export interface CalendlyUser {
  resource: {
    uri: string;
    name: string;
    slug: string;
    email: string;
    scheduling_url: string;
    timezone: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
  };
}

export interface CalendlyEventType {
  uri: string;
  name: string;
  active: boolean;
  description?: string;
  color: string;
  slug: string;
  duration: number;
  kind: string;
  scheduling_url: string;
  created_at: string;
  updated_at: string;
}

export interface CalendlyEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  event_type: string;
  location?: {
    type: string;
    location?: string;
    join_url?: string;
  };
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
  created_at: string;
  updated_at: string;
}

export interface CalendlySchedulingLink {
  resource: {
    booking_url: string;
    owner: string;
    owner_type: string;
  };
}

export interface CalendlyWebhook {
  uri: string;
  callback_url: string;
  created_at: string;
  updated_at: string;
  events: string[];
  scope: string;
  organization: string;
  user: string;
  creator: string;
}

export interface CalendlyResponse<T> {
  collection?: T[];
  resource?: T;
  pagination?: {
    count: number;
    next_page: string | null;
    previous_page: string | null;
    next_page_token: string | null;
    previous_page_token: string | null;
  };
}
