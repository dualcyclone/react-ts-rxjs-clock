import {
  filter,
  from,
  of,
  timer,
  combineLatest,
  Observable,
  ConnectableObservable
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  catchError,
  map,
  flatMap,
  mergeMap,
  publishReplay
} from "rxjs/operators";

import ip$ from "./ip";
import Time from "../models/Time";
import { ONE_HOUR, Preference } from "../lib/constants";

import preferences$ from "./preferences";
import documentResume$ from "./documentResume";

export const fetchedTime$: Observable<Time> = ip$.pipe(
  mergeMap((ip) =>
    documentResume$.pipe(
      mergeMap(() => fromFetch(`https://worldtimeapi.org/api/ip/${ip}`))
    )
  ),
  filter((res: Response) => res.ok),
  mergeMap((res: Response) => from(res.json())),
  catchError(() => of({ utc_datetime: Date.now() })),
  mergeMap((time: { utc_datetime: number }) =>
    preferences$.pipe(
      map(
        (preferences: Preference) =>
          new Time({
            date: new Date(time.utc_datetime),
            display24HourFormat: preferences.use24HourFormat
          })
      )
    )
  )
);

// Re-request time from world time service every 6 hours, after an initial call
const time$: Observable<Time> = combineLatest(
  timer(0, ONE_HOUR * 6),
  preferences$
).pipe(
  flatMap(([_, preferences]) =>
    fetchedTime$.pipe(
      map((time) => time.use24HourFormat(preferences.use24HourFormat))
    )
  ),
  publishReplay(1)
);
(time$ as ConnectableObservable<Time>).connect();

export default time$;
