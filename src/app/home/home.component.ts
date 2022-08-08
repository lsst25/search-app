import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../core/search/search.service";
import {SearchResult} from "../core/search/search.interface";
import {Observable, Subject} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    public searchInput = new FormControl('');

    constructor(private search: SearchService) {}

    public get isLoading$(): Observable<boolean> {
        return this.search.isLoading$;
    }

    public get searchResults$(): Subject<SearchResult[]> {
        return this.search.searchResultsSubject;
    }

    public onInput(): void {
        if (this.searchInput.value === null) {
            return;
        }
        this.search.performLiveSearch(this.searchInput.value);
    }

    public onScroll():void {
        this.search.loadSearchResults();
    }
}
