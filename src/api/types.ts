export type TimeInterval = {
  from: string;
  to: string;
};

export type AvailabilityRule = {
  type: 'wday' | 'date';
  wday?: string;
  date?: string;
  intervals: TimeInterval[];
};

export type AvailabilitySchedule = {
  default: boolean;
  name: string;
  rules: AvailabilityRule[];
  timezone: string;
  uri: string;
  user: string;
};
