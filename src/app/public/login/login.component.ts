import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isStandardMode = true;
  loginForm: FormGroup;

  // Données simulées
  projects = ['Projet 1', 'Projet 2', 'Projet 3'];
  actorTypes = ['Type 1', 'Type 2', 'Type 3'];

  // Tous les acteurs par type
  allActors: { [key: string]: string[] } = {
    'Type 1': ['Acteur 1-1', 'Acteur 1-2', 'Acteur 1-3'],
    'Type 2': ['Acteur 2-1', 'Acteur 2-2', 'Acteur 2-3'],
    'Type 3': ['Acteur 3-1', 'Acteur 3-2', 'Acteur 3-3']
  };

  // Map des acteurs à leurs emails suggérés (préremplissage seulement)
  actorToEmail: { [key: string]: string } = {
    'Acteur 1-1': 'acteur1-1@afor.com',
    'Acteur 1-2': 'acteur1-2@afor.com',
    'Acteur 1-3': 'acteur1-3@afor.com',
    'Acteur 2-1': 'acteur2-1@afor.com',
    'Acteur 2-2': 'acteur2-2@afor.com',
    'Acteur 2-3': 'acteur2-3@afor.com',
    'Acteur 3-1': 'acteur3-1@afor.com',
    'Acteur 3-2': 'acteur3-2@afor.com',
    'Acteur 3-3': 'acteur3-3@afor.com',
    'admin': 'admin@afor.com'
  };

  filteredActors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      project: [null, Validators.required],
      actorType: [null, Validators.required],
      actor: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.get('actorType')?.valueChanges.subscribe(() => {
      this.onActorTypeChange();
    });

    // Mettre à jour l'email lorsqu'un acteur est sélectionné
    this.loginForm.get('actor')?.valueChanges.subscribe((actor) => {
      if (actor && this.actorToEmail[actor]) {
        this.loginForm.get('email')?.setValue(this.actorToEmail[actor]);
      } else {
        this.loginForm.get('email')?.setValue('');
      }
    });

    // Ajout d'un acteur 'admin' pour le mode admin
    if (!this.isStandardMode) {
      if (!this.allActors['Type 1'].includes('admin')) {
        this.allActors['Type 1'].push('admin');
      }
    }
  }

  onActorTypeChange() {
    const selectedType = this.loginForm.get('actorType')?.value;
    this.loginForm.get('actor')?.setValue(null);
    this.filteredActors = selectedType ? this.allActors[selectedType] : [];
  }

  selectMode(mode: string) {
    this.isStandardMode = mode === 'standard';

    // Mettre à jour les acteurs disponibles selon le mode
    if (!this.isStandardMode && !this.allActors['Type 1'].includes('admin')) {
      this.allActors['Type 1'].push('admin');
    } else if (this.isStandardMode && this.allActors['Type 1'].includes('admin')) {
      this.allActors['Type 1'] = this.allActors['Type 1'].filter(actor => actor !== 'admin');
    }

    // Mettre à jour les acteurs filtrés si nécessaire
    if (this.loginForm.get('actorType')?.value === 'Type 1') {
      this.onActorTypeChange();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (this.authService.login(email, password)) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Identifiants incorrects');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
