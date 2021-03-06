import Preferences from "../models/Preferences";

export enum MONTH_FORMAT {
  NUMBER = "number",
  LONG = "long",
  SHORT = "short"
}

type MONTH = { short: string; long: string };
export const MONTHS: MONTH[] = [
  { short: "Jan", long: "January" },
  { short: "Feb", long: "February" },
  { short: "Mar", long: "March" },
  { short: "Apr", long: "April" },
  { short: "May", long: "May" },
  { short: "Jun", long: "June" },
  { short: "Jul", long: "July" },
  { short: "Aug", long: "August" },
  { short: "Sep", long: "September" },
  { short: "Oct", long: "October" },
  { short: "Nov", long: "November" },
  { short: "Dec", long: "December" }
];

export enum DATE_ORDINALS {
  TH = "th",
  ST = "st",
  ND = "nd",
  RD = "rd"
}

export enum TIME_MERIDIANS {
  AM = "AM",
  PM = "PM"
}

export const ONE_HOUR: number = 3600000;

export type Preference = {
  use24HourFormat: boolean;
  showSeconds: boolean;
  monthFormat: MONTH_FORMAT;
};
export const PREFERENCES_DEFAULT: Preference = new Preferences({
  use24HourFormat: true,
  showSeconds: true,
  monthFormat: MONTH_FORMAT.NUMBER
});
