import { MONTH_FORMAT, Preference, PREFERENCES_DEFAULT } from "../lib/constants";

export interface PreferencesConstructor extends Preference {
  update(preferences: Preference): Preference;
  getPrimitivePreferences(): Preference;
  use24HourFormat: boolean;
  showSeconds: boolean;
  monthFormat: MONTH_FORMAT;
}

class Preferences implements PreferencesConstructor {
  public use24HourFormat: boolean = true;
  public showSeconds: boolean = true;
  public monthFormat: MONTH_FORMAT = MONTH_FORMAT.NUMBER;

  constructor(preferences = PREFERENCES_DEFAULT) {
    this.update(preferences);
  }

  update(preferences: Partial<Preference>) {
    const { use24HourFormat, showSeconds, monthFormat } = {
      ...this,
      ...preferences
    };

    this.use24HourFormat = use24HourFormat;
    this.showSeconds = showSeconds;
    this.monthFormat = monthFormat;

    return this;
  }

  getPrimitivePreferences() {
    return { ...this };
  }
}

export default Preferences;
