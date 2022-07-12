import { PREFERENCES_DEFAULT, MONTH_LONG } from "../../lib/constants";

import { preferencesFactory$ } from "../preferences";

describe("preferences$", () => {
  let preferences$;
  let actualOutput;

  beforeEach(() => {
    actualOutput = [];
    preferences$ = preferencesFactory$();
    preferences$.subscribe(function (preferencesEmission) {
      actualOutput.push({ ...preferencesEmission });
    });
  });

  it("Will start with the default values", () => {
    const expectedOutput = [PREFERENCES_DEFAULT];
    expect(actualOutput).toEqual(expectedOutput);
  });

  it("Will update when new preferences are sent", () => {
    const expectedOutput = [
      PREFERENCES_DEFAULT,
      { ...PREFERENCES_DEFAULT, use24HourFormat: false },
      {
        ...PREFERENCES_DEFAULT,
        use24HourFormat: false,
        monthFormat: MONTH_LONG
      },
      { use24HourFormat: false, monthFormat: MONTH_LONG, showSeconds: false }
    ];

    preferences$.next(preferences$.value.update({ use24HourFormat: false }));
    preferences$.next(preferences$.value.update({ monthFormat: MONTH_LONG }));
    preferences$.next(preferences$.value.update({ showSeconds: false }));

    expect(actualOutput).toEqual(expectedOutput);
  });
});
