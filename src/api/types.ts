export type Rule = {
  start_time: string;
  end_time: string;
};

export type AvailabilitySchedule = {
  default: boolean;
  name: string;
  rules: Rule[];
  timezone: string;
  uri: string;
  user: string;
};

export type AvailabilityResponse = AvailabilitySchedule[];
