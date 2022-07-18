/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { of } from "rxjs";
import { act, render } from "@testing-library/react";
import Time from "../../../models/Time";
import Preferences from "../../../models/Preferences";
import preferences$ from "../../../streams/preferences";
import Clock from "../index";
import { MONTH_FORMAT } from "../../../lib/constants";

describe("Clock component tests", () => {
  afterEach(() => act(() => preferences$.next(new Preferences())));

  it("Will render the loader when no time is detected", () => {
    const { getByRole } = render(<Clock />);

    expect(getByRole("progressbar")).toBeTruthy();
  });

  it("Will render the clock when time is detected", async () => {
    const mockTimeObj = new Time({ date: new Date("21 Jul 2022 23:24:25") });

    const { getByText } = render(<Clock userTimeStream$={of(mockTimeObj)} />);

    expect(getByText("21/07/2022 23:24:25")).toBeTruthy();
  });

  it("Will render the clock in 12 hour format", async () => {
    const mockTimeObj = new Time({ date: new Date("21 Jul 2022 23:24:25"), display24HourFormat: false });

    const { getByText } = render(<Clock userTimeStream$={of(mockTimeObj)} />);

    expect(getByText("21/07/2022 11:24:25 PM")).toBeTruthy();
  });

  it("Will render the clock without seconds when preferences are set to hide seconds", async () => {
    const mockTimeObj = new Time({ date: new Date("21 Jul 2022 23:24:25") });
    preferences$.next(preferences$.value.update({ showSeconds: false }));

    const { getByText } = render(<Clock userTimeStream$={of(mockTimeObj)} />);

    expect(getByText("21/07/2022 23:24")).toBeTruthy();
  });

  it("Will render the clock with short month format when preferences are set to display short month names", async () => {
    const mockTimeObj = new Time({ date: new Date("21 Jul 2022 23:24:25") });
    preferences$.next(preferences$.value.update({ monthFormat: MONTH_FORMAT.SHORT }));

    const { getByText } = render(<Clock userTimeStream$={of(mockTimeObj)} />);

    expect(getByText("21st Jul 2022 23:24:25")).toBeTruthy();
  });

  it("Will render the clock with long month format when preferences are set to display short month names", async () => {
    const mockTimeObj = new Time({ date: new Date("21 Jul 2022 23:24:25") });
    preferences$.next(preferences$.value.update({ monthFormat: MONTH_FORMAT.LONG }));

    const { getByText } = render(<Clock userTimeStream$={of(mockTimeObj)} />);

    expect(getByText("21st July 2022 23:24:25")).toBeTruthy();
  });
});
