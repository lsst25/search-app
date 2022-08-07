import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isMenuCollapsed = true;

  public toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
