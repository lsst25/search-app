import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public isMenuCollapsed: boolean = true;

  public toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
