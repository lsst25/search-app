import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchService} from "../core/search/search.service";
import {NewsResult} from "../core/search/search.interface";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  public newsResults: NewsResult[] = [];

  constructor(private search: SearchService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.search.latestNewsSubject.subscribe(
        news => {
          this.newsResults = [...news];
          this.cd.markForCheck();
        }
    )
    this.search.initLatestNews();
  }

  public onScroll(): void {
      this.search.loadLatestNews();
  }
}
