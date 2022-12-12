import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  standalone: true,
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCardComponent {}
