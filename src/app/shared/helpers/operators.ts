import {Observable, share} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export function liveSearch<T, R>(
    callback: (query: T) => Observable<R>,
    delay = 250
) {
    return (source$: Observable<T>) => source$.pipe(
        debounceTime(delay),
        distinctUntilChanged(),
        switchMap(callback),
        share()
    )
}
