import { Preference, PREFERENCES_DEFAULT } from "../lib/constants";

interface PreferencesConstructor extends Preference {
  update(preferences: Preference): Preference;
  getPrimitivePreferences(): Preference;
}

class Preferences implements PreferencesConstructor {
  public use24HourFormat = false;
  public showSeconds = false;
  public monthFormat = "number";

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
