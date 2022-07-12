/**
 * @jest-environment jsdom
 */

import * as React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PreferencesPanel from "../index";
import preferences$ from "../../../streams/preferences";

describe("PreferencePanel component tests", () => {
  it("Will not render when no preferences are detected", () => {
    // @ts-ignore expecting this to display nothing
    const { component } = render(<PreferencesPanel />);

    expect(component).toBeFalsy();
  });

  it("When preferences are detected, it will render the preference toggles", () => {
    const { getByText, getByRole, getByTestId } = render(<PreferencesPanel />);

    // Time format preference toggle to exist
    expect(getByText("Format")).toBeTruthy();
    expect(getByRole("button", { name: "12" })).toBeTruthy();
    expect(getByRole("button", { name: "24" })).toBeTruthy();

    // Seconds display preference toggle to exist
    expect(getByText("Display seconds")).toBeTruthy();
    expect(getByTestId("CheckIcon")).toBeTruthy();

    // Month format display preference toggle to exist
    expect(getByText("Month format")).toBeTruthy();
    expect(getByRole("button", { name: "Number" })).toBeTruthy();
    expect(getByRole("button", { name: "Short" })).toBeTruthy();
    expect(getByRole("button", { name: "Long" })).toBeTruthy();
  });

  describe("Handle toggles", () => {
    it("Should toggle time format", async () => {
      const { getByRole } = render(<PreferencesPanel />);

      expect(preferences$.value.use24HourFormat).toBe(true);

      await userEvent.click(getByRole("button", { name: "12" }));

      expect(preferences$.value.use24HourFormat).toBe(false);

      await userEvent.click(getByRole("button", { name: "24" }));

      expect(preferences$.value.use24HourFormat).toBe(true);
    });

    it("Should toggle display of seconds", async () => {
      const { getByTestId } = render(<PreferencesPanel />);

      expect(preferences$.value.showSeconds).toBe(true);

      await userEvent.click(getByTestId("CheckIcon"));

      expect(preferences$.value.showSeconds).toBe(false);

      await userEvent.click(getByTestId("CheckIcon"));

      expect(preferences$.value.showSeconds).toBe(true);
    });

    it("Should toggle month format", async () => {
      const { getByRole } = render(<PreferencesPanel />);

      expect(preferences$.value.monthFormat).toBe("number");

      await userEvent.click(getByRole("button", { name: "Short" }));

      expect(preferences$.value.monthFormat).toBe("short");

      await userEvent.click(getByRole("button", { name: "Long" }));

      expect(preferences$.value.monthFormat).toBe("long")

      await userEvent.click(getByRole("button", { name: "Number" }));

      expect(preferences$.value.monthFormat).toBe("number");
    });
  });
});
