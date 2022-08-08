import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public isMenuCollapsed = true;

  public toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
