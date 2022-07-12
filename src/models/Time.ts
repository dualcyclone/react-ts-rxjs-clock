import { DATE_ORDINALS, MONTHS, TIME_MERIDIANS } from "../lib/constants";
import {
  calculateDateOrdinal,
  hourFormatter,
  calculateMeridian,
  unitFixer
} from "../lib/utils";

type TimeType = {
  dateObj: Date;
  display24hr: boolean;
  timestamp: number;
  year: number;
  month: string;
  monthName: string;
  date: string;
  ordinal: DATE_ORDINALS;
  hour: string;
  minute: string;
  second: string;
  meridian: TIME_MERIDIANS | null;
};

interface TimeConstructor extends TimeType {
  incrementTime(milliseconds: number): Time;
  use24HourFormat(display24hr: boolean): Time;
  getPrimitiveTime(): Time;
}

class Time implements TimeConstructor {
  public dateObj = new Date();
  public display24hr = false;
  public timestamp = this.dateObj.getTime();
  public year = this.dateObj.getFullYear();
  public month = unitFixer(this.dateObj.getMonth() + 1);
  public monthName = MONTHS[this.month];
  public date = unitFixer(this.dateObj.getDate());
  public ordinal = calculateDateOrdinal(this.dateObj.getDate());
  public hour = hourFormatter(this.dateObj.getHours(), this.display24hr);
  public minute = unitFixer(this.dateObj.getMinutes());
  public second = unitFixer(this.dateObj.getSeconds());
  public meridian = calculateMeridian(
    this.dateObj.getHours(),
    this.display24hr
  );

  constructor({ date = new Date(), display24HourFormat = true } = {}) {
    this.dateObj = date;
    this.display24hr = display24HourFormat;

    this._setProps();
  }

  // Technically a private method, need a different container to use babel preset
  _setProps() {
    const date = this.dateObj.getDate();
    const month = this.dateObj.getMonth();
    const hours = this.dateObj.getHours();

    this.timestamp = this.dateObj.getTime();
    this.year = this.dateObj.getFullYear();
    this.month = unitFixer(month + 1);
    this.monthName = MONTHS[month];
    this.date = unitFixer(date);
    this.ordinal = calculateDateOrdinal(date);
    this.hour = hourFormatter(hours, this.display24hr);
    this.minute = unitFixer(this.dateObj.getMinutes());
    this.second = unitFixer(this.dateObj.getSeconds());
    this.meridian = calculateMeridian(hours, this.display24hr);
  }

  incrementTime(milliseconds: number) {
    if (typeof milliseconds !== "number" || milliseconds === 0) {
      return this;
    }

    this.dateObj = new Date(this.timestamp + milliseconds);

    this._setProps();

    return this;
  }

  use24HourFormat(display24hr = true) {
    this.display24hr = display24hr;

    this._setProps();

    return this;
  }

  getPrimitiveTime() {
    return { ...this };
  }
}

export default Time;
