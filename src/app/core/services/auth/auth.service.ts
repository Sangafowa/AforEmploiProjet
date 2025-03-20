import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
  role: string;
  project?: string;
  actorType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  // Base de données utilisateurs simulée
  private users: User[] = [
    { email: 'admin@afor.com', password: 'admin123', role: 'admin' },
    { email: 'acteur1-1@afor.com', password: 'pass123', role: 'user', project: 'Projet 1', actorType: 'Type 1' },
    { email: 'acteur1-2@afor.com', password: 'pass123', role: 'user', project: 'Projet 1', actorType: 'Type 1' },
    { email: 'acteur1-3@afor.com', password: 'pass123', role: 'user', project: 'Projet 1', actorType: 'Type 1' },
    { email: 'acteur2-1@afor.com', password: 'pass123', role: 'user', project: 'Projet 2', actorType: 'Type 2' },
    { email: 'acteur2-2@afor.com', password: 'pass123', role: 'user', project: 'Projet 2', actorType: 'Type 2' },
    { email: 'acteur2-3@afor.com', password: 'pass123', role: 'user', project: 'Projet 2', actorType: 'Type 2' },
    { email: 'acteur3-1@afor.com', password: 'pass123', role: 'user', project: 'Projet 3', actorType: 'Type 3' },
    { email: 'acteur3-2@afor.com', password: 'pass123', role: 'user', project: 'Projet 3', actorType: 'Type 3' },
    { email: 'acteur3-3@afor.com', password: 'pass123', role: 'user', project: 'Projet 3', actorType: 'Type 3' }
  ];

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        role: user.role,
        project: user.project,
        actorType: user.actorType
      }));
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}
