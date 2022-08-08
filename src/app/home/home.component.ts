import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../core/search/search.service";
import {SearchResult} from "../core/search/search.interface";
import {Observable} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    public searchInput = new FormControl('');

    public searchResults: SearchResult[] = [];

    constructor(private search: SearchService) {}

    get isLoading$(): Observable<boolean> {
        return this.search.isLoading$;
    }

    ngOnInit(): void {
        this.search.searchResultsSubject.subscribe(
            results => this.searchResults = [...results]
        )
    }

    public onInput(): void {
        if (this.searchInput.value === null) {
            return;
        }
        this.search.performLiveSearch(this.searchInput.value);
    }

    public onScroll():void {
        this.search.loadResults();
    }
}
