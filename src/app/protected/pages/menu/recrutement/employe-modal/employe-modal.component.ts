// employe-modal.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../../../core/models/employee.model';

@Component({
  standalone: true,
  selector: 'app-employe-modal',
  templateUrl: './employe-modal.component.html',
  styleUrls: ['./employe-modal.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmployeModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() saveEmployee = new EventEmitter<Employee>();

  currentStep = 1;
  employeeForm: FormGroup;

  // Dropdown options
  regions: string[] = ['TCHOLOGO', 'Autres régions...'];
  departements: string[] = [];
  sousPrefectures: string[] = [];
  genres: string[] = ['Masculin', 'Féminin', 'Autre'];
  typesPersonne: string[] = ['Employé', 'Stagiaire', 'Consultant', 'Autre'];
  diplomes: string[] = ['Baccalauréat', 'Licence', 'Master', 'Doctorat', 'Autre'];
  ecoles: string[] = ['École A', 'École B', 'École C', 'Autre'];
  categories: string[] = ['Administratif', 'Technique', 'Commercial', 'Autre'];
  postes: string[] = ['Directeur', 'Manager', 'Assistant', 'Technicien', 'Autre'];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      // Localisation
      lieuTravail: ['', Validators.required],
      region: ['', Validators.required],
      departement: [''],
      sousPrefecture: [''],

      // Informations personnelles
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^(01|05|07)[0-9]{8}$')]],
      genre: [''],
      typePersonne: [''],
      diplome: [''],
      ecole: [''],

      // Contrat
      categorie: [''],
      poste: [''],
      duree: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['']
    });
  }

  ngOnInit(): void {
    // Load initial data if needed
    this.loadDepartements();
  }

  loadDepartements(): void {
    // This would typically be an API call
    // For now, we'll just simulate some data
    this.departements = ['Département 1', 'Département 2', 'Département 3'];
  }

  loadSousPrefectures(): void {
    // Similarly, this would be based on the selected département
    this.sousPrefectures = ['Sous-préfecture 1', 'Sous-préfecture 2'];
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  cancel(): void {
    this.closeModal.emit(true);
  }

  save(): void {
    if (this.employeeForm.valid) {
      // Create an Employee object from form data
      const formData = this.employeeForm.value;
      const newEmployee: Employee = {
        id: Date.now().toString(), // Generate a temporary ID
        region: formData.region,
        departement: formData.departement,
        sousPrefecture: formData.sousPrefecture,
        nom: formData.nom,
        prenom: formData.prenom,
        genre: formData.genre,
        age: this.calculateAge(formData.dateNaissance),
        poste: formData.poste,
        type: formData.typePersonne,
        statutContrat: 'Actif', // Default value
        dureeContrat: formData.duree + ' mois'
      };

      this.saveEmployee.emit(newEmployee);
      this.closeModal.emit(true);
    }
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
