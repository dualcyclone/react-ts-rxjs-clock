import { fromEvent } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

export default fromEvent(document, 'resume').pipe(
  startWith(true),
  mapTo(true)
);

document.addEventListener('freeze', () => console.log('*** P FREEZE'));
document.addEventListener('resume', () => console.log('*** P RESUME'));

fromEvent(document, 'freeze').subscribe(() => console.log('**** O FREEZE'));
fromEvent(document, 'resume').subscribe(() => console.log('**** O RESUME'));
