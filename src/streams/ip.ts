import { fromFetch } from "rxjs/fetch";
import { from, Observable, ConnectableObservable } from "rxjs";
import { filter, map, mergeMap, publishReplay } from "rxjs/operators";

const ip$: Observable<string> = fromFetch("https://ipapi.co/json/").pipe(
  filter((res) => res.ok),
  mergeMap((res) => from(res.json())),
  map(({ ip }) => ip),
  publishReplay(1)
);

// Casted observable type - known issue in TS
(ip$ as ConnectableObservable<string>).connect();

export default ip$;
