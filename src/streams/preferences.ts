import { BehaviorSubject } from "rxjs";
import Preferences from "../models/Preferences";

export const preferencesFactory$ = (): BehaviorSubject<Preferences> =>
  new BehaviorSubject(new Preferences());

const preferencesSingleton$: BehaviorSubject<Preferences> = preferencesFactory$();

export default preferencesSingleton$;
