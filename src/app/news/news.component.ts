import { Component, OnInit } from '@angular/core';
import {SearchService} from "../core/search/search.service";
import {NewsResult} from "../core/search/search.interface";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public newsResults: NewsResult[] = [];

  constructor(private search: SearchService) { }

  ngOnInit(): void {
    this.search.getLatestNews().subscribe(
        news => {
          this.newsResults = news;
        }
    )
  }

}
