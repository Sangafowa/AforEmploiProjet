import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    MatMenu,
    MatIcon,
    MatMenuTrigger,
    CommonModule,
    DatePipe
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentDate: Date = new Date();

  constructor(private router: Router) {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000); // Mise à jour de l'heure chaque minute
  }

  changePassword() {
    alert('Changer le mot de passe (fonction à implémenter)');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
