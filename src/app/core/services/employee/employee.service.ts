import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];

  constructor() {
    // Initialize with some dummy data
    this.employees = [
      {
        id: '1',
        region: 'TCHOLOGO',
        departement: 'Département 1',
        sousPrefecture: 'Sous-préfecture 1',
        nom: 'Diallo',
        prenom: 'Fatou',
        genre: 'Féminin',
        age: 28,
        poste: 'Assistante Administrative',
        type: 'Employé',
        statutContrat: 'Actif',
        dureeContrat: '12 mois'
      },
      {
        id: '2',
        region: 'TCHOLOGO',
        departement: 'Département 2',
        sousPrefecture: 'Sous-préfecture 2',
        nom: 'Koné',
        prenom: 'Amadou',
        genre: 'Masculin',
        age: 35,
        poste: 'Technicien',
        type: 'Employé',
        statutContrat: 'Actif',
        dureeContrat: '24 mois'
      }
    ];
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }
}
