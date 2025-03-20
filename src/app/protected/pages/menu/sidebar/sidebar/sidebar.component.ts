import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  activeRoute: string = 'dashboard';

  constructor(private router: Router) {}

  navigate(route: string) {
    this.activeRoute = route;
    this.router.navigate([route]);
  }
}
