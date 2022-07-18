import React from "react";
import { useObservable } from "react-use";

import CheckIcon from "@mui/icons-material/Check";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { MONTH_FORMAT, Preference } from "../../lib/constants";

import preferences$ from "../../streams/preferences";

import { PreferenceBoxTitle, PreferenceButtonGroup, PreferencePanelCard } from "./PreferencesPanel.styles";

export const PreferencesPanel = () => {
  const preferences = useObservable(preferences$);

  if (!preferences) {
    return null;
  }

  const handlePreferenceChange = (preference: Partial<Preference>) =>
    preferences$.next(preferences.update(preference));

  return (
    <PreferencePanelCard elevation={0}>
      <PreferenceButtonGroup>
        <PreferenceBoxTitle>Format</PreferenceBoxTitle>
        <ToggleButtonGroup
          value={preferences.use24HourFormat}
          exclusive
          onChange={() =>
            handlePreferenceChange({
              use24HourFormat: !preferences.use24HourFormat
            })
          }
        >
          <ToggleButton value={false}>12</ToggleButton>
          <ToggleButton value={true}>24</ToggleButton>
        </ToggleButtonGroup>
      </PreferenceButtonGroup>
      <PreferenceButtonGroup>
        <PreferenceBoxTitle>Display seconds</PreferenceBoxTitle>
        <ToggleButton
          value="check"
          selected={preferences.showSeconds}
          onChange={() =>
            handlePreferenceChange({
              showSeconds: !preferences.showSeconds
            })
          }
        >
          <CheckIcon />
        </ToggleButton>
      </PreferenceButtonGroup>
      <PreferenceButtonGroup>
        <PreferenceBoxTitle>Month format</PreferenceBoxTitle>
        <ToggleButtonGroup
          value={preferences.monthFormat}
          exclusive
          onChange={(_, value) =>
            handlePreferenceChange({ monthFormat: value || MONTH_FORMAT.NUMBER })
          }
        >
          <ToggleButton value={MONTH_FORMAT.NUMBER}>Number</ToggleButton>
          <ToggleButton value={MONTH_FORMAT.SHORT}>Short</ToggleButton>
          <ToggleButton value={MONTH_FORMAT.LONG}>Long</ToggleButton>
        </ToggleButtonGroup>
      </PreferenceButtonGroup>
    </PreferencePanelCard>
  );
};

export default PreferencesPanel;
