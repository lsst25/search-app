import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {}
