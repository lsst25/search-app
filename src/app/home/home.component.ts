import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SearchService} from "../core/search/search.service";
import {liveSearch} from "../shared/helpers/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public searchInput = new FormControl('');

    private searchValueSubject = new Subject<string>();

    readonly searchResults$ = this.searchValueSubject.pipe(
        liveSearch(searchValue => this.search.getSearchResults(searchValue, 0), 2500)
    );

    constructor(private search: SearchService) {
    }

    ngOnInit(): void {
    }

    onInput() {
        if (!this.searchInput.value) {
            return;
        }
        this.searchValueSubject.next(this.searchInput.value);
    }
}
