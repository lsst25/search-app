import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SearchResult} from "../../core/search/search.interface";

@Component({
  selector: 'app-search-result-tile',
  templateUrl: './search-result-tile.component.html',
  styleUrls: ['./search-result-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultTileComponent {
  @Input() public searchItem!: SearchResult;
}
