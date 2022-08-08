import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NewsResult} from "../../core/search/search.interface";

@Component({
  selector: 'app-news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsTileComponent {
  @Input() newsItem!: NewsResult;
}
