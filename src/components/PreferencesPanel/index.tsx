import React from "react";
import { useObservable } from "react-use";

import CheckIcon from "@mui/icons-material/Check";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import { MONTH_NUMBER, MONTH_SHORT, MONTH_LONG, Preference } from "../../lib/constants";

import preferences$ from "../../streams/preferences";

import {
  PreferencePanelCard,
  PreferenceButtonGroup,
  PreferenceBoxTitle
} from "./PreferencesPanel.styles";

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
            handlePreferenceChange({ monthFormat: value || MONTH_NUMBER })
          }
        >
          <ToggleButton value={MONTH_NUMBER}>Number</ToggleButton>
          <ToggleButton value={MONTH_SHORT}>Short</ToggleButton>
          <ToggleButton value={MONTH_LONG}>Long</ToggleButton>
        </ToggleButtonGroup>
      </PreferenceButtonGroup>
    </PreferencePanelCard>
  );
};

export default PreferencesPanel;
