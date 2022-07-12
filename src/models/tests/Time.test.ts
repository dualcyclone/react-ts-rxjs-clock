import mockdate from "mockdate";
import * as utils from "../../lib/utils";
import { MONTHS, DATE_ORDINALS, TIME_MERIDIANS } from "../../lib/constants";
import Time from "../Time";

describe("Time model test", () => {
  describe("constructor", () => {
    afterEach(() => {
      jest.restoreAllMocks();
      mockdate.reset();
    });

    it("Will create a Time instance without any provided parameters", () => {
      jest.spyOn(utils, "unitFixer");
      jest.spyOn(utils, "calculateDateOrdinal");
      jest.spyOn(utils, "hourFormatter");
      jest.spyOn(utils, "calculateMeridian");

      const fixedDate = new Date(2020, 3, 15, 0);
      mockdate.set(fixedDate);
      const SUT = new Time();

      expect(SUT).toBeInstanceOf(Time);
      expect(typeof SUT.incrementTime).toBe("function");
      expect(typeof SUT.use24HourFormat).toBe("function");
      expect(typeof SUT.getPrimitiveTime).toBe("function");
      expect(SUT.display24hr).toBeTruthy();
      expect(SUT.timestamp).toEqual(fixedDate.getTime());
      expect(SUT.year).toEqual(fixedDate.getFullYear());
      expect(SUT.month).toEqual(`0${fixedDate.getMonth() + 1}`);
      expect(SUT.monthName).toEqual(MONTHS[fixedDate.getMonth()]);
      expect(SUT.date).toEqual(`${fixedDate.getDate()}`);
      expect(SUT.ordinal).toEqual(DATE_ORDINALS.TH);
      expect(SUT.hour).toEqual(`0${fixedDate.getHours()}`);
      expect(SUT.minute).toEqual(`0${fixedDate.getMinutes()}`);
      expect(SUT.second).toEqual(`0${fixedDate.getSeconds()}`);
      expect(SUT.meridian).toEqual(null);

      expect(utils.unitFixer).toHaveBeenCalledTimes(8);
      expect(utils.calculateDateOrdinal).toHaveBeenCalledTimes(2);
      expect(utils.hourFormatter).toHaveBeenCalledTimes(2);
      expect(utils.calculateMeridian).toHaveBeenCalledTimes(2);
    });

    it("Will create a Time instance with a pre-existing Date instance", () => {
      const fixedDate = new Date(2019, 3, 15, 0);

      const SUT = new Time({ date: fixedDate });

      expect(SUT.display24hr).toBeTruthy();
      expect(SUT.timestamp).toEqual(fixedDate.getTime());
      expect(SUT.year).toEqual(fixedDate.getFullYear());
      expect(SUT.month).toEqual(`0${fixedDate.getMonth() + 1}`);
      expect(SUT.monthName).toEqual(MONTHS[fixedDate.getMonth()]);
      expect(SUT.date).toEqual(`${fixedDate.getDate()}`);
      expect(SUT.ordinal).toEqual(DATE_ORDINALS.TH);
      expect(SUT.hour).toEqual(`0${fixedDate.getHours()}`);
      expect(SUT.minute).toEqual(`0${fixedDate.getMinutes()}`);
      expect(SUT.second).toEqual(`0${fixedDate.getSeconds()}`);
      expect(SUT.meridian).toEqual(null);
    });
    it("Will create a Time instance with 12 hour time format", () => {
      const fixedDate = new Date(2020, 3, 15, 0);
      mockdate.set(fixedDate);
      const SUT = new Time({ display24HourFormat: false });

      expect(SUT.display24hr).toBeFalsy();
      expect(SUT.timestamp).toEqual(fixedDate.getTime());
      expect(SUT.year).toEqual(fixedDate.getFullYear());
      expect(SUT.month).toEqual(`0${fixedDate.getMonth() + 1}`);
      expect(SUT.monthName).toEqual(MONTHS[fixedDate.getMonth()]);
      expect(SUT.date).toEqual(`${fixedDate.getDate()}`);
      expect(SUT.ordinal).toEqual(DATE_ORDINALS.TH);
      expect(SUT.hour).toEqual("12");
      expect(SUT.minute).toEqual(`0${fixedDate.getMinutes()}`);
      expect(SUT.second).toEqual(`0${fixedDate.getSeconds()}`);
      expect(SUT.meridian).toEqual(TIME_MERIDIANS.AM);
    });
    it("Will create a Time instance with a pre-existing Date instance and 12 hour time format", () => {
      const fixedDate = new Date(2019, 3, 15, 0);

      const SUT = new Time({ date: fixedDate, display24HourFormat: false });

      expect(SUT.display24hr).toBeFalsy();
      expect(SUT.timestamp).toEqual(fixedDate.getTime());
      expect(SUT.year).toEqual(fixedDate.getFullYear());
      expect(SUT.month).toEqual(`0${fixedDate.getMonth() + 1}`);
      expect(SUT.monthName).toEqual(MONTHS[fixedDate.getMonth()]);
      expect(SUT.date).toEqual(`${fixedDate.getDate()}`);
      expect(SUT.ordinal).toEqual(DATE_ORDINALS.TH);
      expect(SUT.hour).toEqual("12");
      expect(SUT.minute).toEqual(`0${fixedDate.getMinutes()}`);
      expect(SUT.second).toEqual(`0${fixedDate.getSeconds()}`);
      expect(SUT.meridian).toEqual(TIME_MERIDIANS.AM);
    });
  });

  describe("Instance Methods", () => {
    describe("incrementTime", () => {
      const fixedDate = new Date(2020, 3, 15, 0);
      let SUT: Time;

      beforeEach(() => {
        mockdate.set(fixedDate);
        SUT = new Time();
      });

      afterEach(() => mockdate.reset());

      it("Will ignore a zero number", () => {
        expect(SUT.timestamp).toEqual(fixedDate.getTime());

        SUT.incrementTime(0);
        expect(SUT.timestamp).toEqual(fixedDate.getTime());
      });

      describe("Will increment time with a valid number", () => {
        it.each`
          timeName        | timeIncrement  | expectedDate
          ${"One Second"} | ${1000}        | ${new Date(2020, 3, 15, 0, 0, 1)}
          ${"One Minute"} | ${60000}       | ${new Date(2020, 3, 15, 0, 1, 0)}
          ${"One Hour"}   | ${3600000}     | ${new Date(2020, 3, 15, 1, 0, 0)}
          ${"One Day"}    | ${86400000}    | ${new Date(2020, 3, 16, 0, 0, 0)}
          ${"One Week"}   | ${604800000}   | ${new Date(2020, 3, 22, 0, 0, 0)}
          ${"28 Days"}    | ${2419200000}  | ${new Date(2020, 4, 13, 0, 0, 0)}
          ${"One Year"}   | ${31536000000} | ${new Date(2021, 3, 15, 0, 0, 0)}
        `("$timeName", ({ timeIncrement, expectedDate }) => {
          expect(SUT.timestamp).toEqual(fixedDate.getTime());

          SUT.incrementTime(timeIncrement);
          expect(SUT.timestamp).not.toEqual(fixedDate.getTime());
          expect(SUT.timestamp).toEqual(expectedDate.getTime());

          expect(SUT.year).toEqual(expectedDate.getFullYear());
          expect(SUT.month).toEqual(`0${expectedDate.getMonth() + 1}`);
          expect(SUT.monthName).toEqual(MONTHS[expectedDate.getMonth()]);
          expect(SUT.date).toEqual(`${expectedDate.getDate()}`);
          expect(SUT.hour).toEqual(`0${expectedDate.getHours()}`);
          expect(SUT.minute).toEqual(`0${expectedDate.getMinutes()}`);
          expect(SUT.second).toEqual(`0${expectedDate.getSeconds()}`);
        });
      });
    });

    describe("use24HourFormat", () => {
      afterEach(() => mockdate.reset());

      it("Will change the internal setting for displaying 24 hour format from 24 hour to 12 hour", () => {
        const fixedDate = new Date(2020, 3, 15, 0);
        mockdate.set(fixedDate);
        const SUT = new Time();

        expect(SUT.hour).toEqual("00");
        expect(SUT.meridian).toEqual(null);

        SUT.use24HourFormat(false);

        expect(SUT.hour).toEqual("12");
        expect(SUT.meridian).toEqual(TIME_MERIDIANS.AM);

        SUT.use24HourFormat(true);

        expect(SUT.hour).toEqual("00");
        expect(SUT.meridian).toEqual(null);

        SUT.use24HourFormat(false);

        expect(SUT.hour).toEqual("12");
        expect(SUT.meridian).toEqual(TIME_MERIDIANS.AM);

        SUT.use24HourFormat();

        expect(SUT.hour).toEqual("00");
        expect(SUT.meridian).toEqual(null);
      });
    });

    describe("getPrimitiveTime", () => {
      afterEach(() => mockdate.reset());

      it("Will return a plain JavaScript object with the enumerable properties and values", () => {
        const fixedDate = new Date(2020, 3, 15, 0);
        mockdate.set(fixedDate);
        const SUT = new Time().getPrimitiveTime();

        expect(SUT).not.toBeInstanceOf(Time);
        expect(typeof SUT).toBe("object");
        expect(Object.keys(SUT)).toEqual([
          "dateObj",
          "display24hr",
          "timestamp",
          "year",
          "month",
          "monthName",
          "date",
          "ordinal",
          "hour",
          "minute",
          "second",
          "meridian"
        ]);
        expect(Object.values(SUT)).toEqual([
          fixedDate,
          true,
          1586905200000,
          2020,
          "04",
          { long: "April", short: "Apr" },
          "15",
          "th",
          "00",
          "00",
          "00",
          null
        ]);

        expect(SUT.incrementTime).toBeUndefined();
        expect(SUT.use24HourFormat).toBeUndefined();
        expect(SUT.getPrimitiveTime).toBeUndefined();
      });
    });
  });
});
