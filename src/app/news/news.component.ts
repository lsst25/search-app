import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchService} from "../core/search/search.service";
import {NewsResult} from "../core/search/search.interface";
import {Subject} from "rxjs";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
    constructor(private search: SearchService) {}

    public get newsResults$(): Subject<NewsResult[]> {
        return this.search.latestNewsSubject;
    }

    public ngOnInit(): void {
        this.search.initLatestNews();
    }

    public onScroll(): void {
        this.search.loadLatestNews();
    }
}
