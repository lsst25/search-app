import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SearchResult } from '../../core/search/search.interface'
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-search-result-tile',
  templateUrl: './search-result-tile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
      })),
      state('closed', style({
        height: '50px',
        opacity: 0.8,
        overflow: 'hidden'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class SearchResultTileComponent {
  @Input() public searchItem!: SearchResult

  protected isOpen = false;

  public toggleIsOpen(): void {
    this.isOpen = !this.isOpen
  }
}
