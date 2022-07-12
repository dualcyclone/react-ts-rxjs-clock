import React from "react";
import { Observable } from "rxjs";
import { useObservable } from "react-use";

import { MONTH_NUMBER, PREFERENCES_DEFAULT } from "../../lib/constants";

import preferences$ from "../../streams/preferences";
import userTime$ from "../../streams/userTime";

import { ClockLoader, StyledClock } from "./Clock.styles";
import Time from "../../models/Time";

type ClockProps = {
  userTimeStream$?: Observable<Time>,
}

// allowing override of userTime$ for testing purposes. Mocking stream doesn't seem to work as expected
const Clock = ({ userTimeStream$ = userTime$ }: ClockProps) => {
  const preferences = useObservable(preferences$, PREFERENCES_DEFAULT);
  const time = useObservable(userTimeStream$);

  if (!time) {
    return <ClockLoader />;
  }

  const {
    year,
    month,
    monthName,
    date,
    ordinal,
    hour,
    minute,
    second,
    meridian
  } = time;

  const displaySeconds = () => (preferences.showSeconds ? `:${second}` : "");
  const displayMeridian = () => (meridian ? ` ${meridian}` : "");
  const displayMonth = () =>
    preferences.monthFormat === MONTH_NUMBER
      ? `/${month}/`
      : `${ordinal} ${monthName[preferences.monthFormat]} `;

  return (
    <StyledClock>{`${date}${displayMonth()}${year} ${hour}:${minute}${displaySeconds()}${displayMeridian()}`}</StyledClock>
  );
};

export default Clock;
