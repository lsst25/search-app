import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../core/search/search.service";
import {SearchResult} from "../core/search/search.interface";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public searchInput = new FormControl('');

    public searchResults: SearchResult[] = [];

    constructor(private search: SearchService) {}

    ngOnInit(): void {
        this.search.searchResultsSubject.subscribe(
            results => this.searchResults = [...results]
        )

        this.searchInput.valueChanges.subscribe(
            value => {
                if (value === null) {
                    return;
                }
                this.search.performLiveSearch(value);
            }
        )
    }

    public onScroll():void {
        this.search.loadResults();
    }
}
