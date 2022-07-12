import { DATE_ORDINALS, TIME_MERIDIANS } from "../lib/constants";

export const unitFixer = (unit: number): string =>
  `${unit < 10 ? "0" : ""}${unit}`;

export const calculateDateOrdinal = (date: number) => {
  const j = date % 10;
  const k = date % 100;
  let ordinal = DATE_ORDINALS.TH;

  if (j === 1 && k !== 11) {
    ordinal = DATE_ORDINALS.ST;
  }
  if (j === 2 && k !== 12) {
    ordinal = DATE_ORDINALS.ND;
  }
  if (j === 3 && k !== 13) {
    ordinal = DATE_ORDINALS.RD;
  }

  return ordinal;
};

export const hourFormatter = (hour: number, is24Hour: boolean): string => {
  let formattedHour = `${hour}`;

  if (is24Hour) {
    formattedHour = unitFixer(hour);
  }

  if (!is24Hour && hour > 12) {
    formattedHour = `${hour - 12}`;
  }

  if (!is24Hour && hour === 0) {
    formattedHour = "12";
  }

  return `${formattedHour}`;
};

export const calculateMeridian = (
  hour: number,
  is24Hour: boolean
): TIME_MERIDIANS | null => {
  if (is24Hour) {
    return null;
  }

  return hour > 11 ? TIME_MERIDIANS.PM : TIME_MERIDIANS.AM;
};
