import { Component, Renderer2 } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router'; // Ajouter Router
import { SidebarComponent } from './protected/pages/menu/sidebar/sidebar/sidebar.component';
import { CommonModule } from '@angular/common'; // Ajouter CommonModule

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule,RouterLink,       // Ajouté
    RouterLinkActive,], // Ajouter CommonModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'afor-emploiProjet-frontend';

  constructor(
    private renderer: Renderer2,
    private router: Router // Injecter le Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'custom-body');
  }

  // Méthode pour vérifier si on est sur la page login
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  tabs = [
    {
      label: 'Tableau de bord',
      path: 'dashboard',
      icon: 'fas fa-chart-line'
    },
    {
      label: 'Gestion des employés',
      path: 'list-employe',
      icon: 'fas fa-users'
    },
    {
      label: 'Paramètres',
      path: 'parametres',
      icon: 'fas fa-cog'
    }
  ];
}
