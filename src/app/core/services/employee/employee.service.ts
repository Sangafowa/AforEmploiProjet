import { Injectable } from '@angular/core';
import {Employee} from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1, region: 'Nord', departement: 'Yopougon', sousPrefecture: 'Anyama',
      nom: 'Doe', prenom: 'John', genre: 'Homme', age: 30,
      poste: 'Développeur', type: 'CDI', statutContrat: 'Actif', dureeContrat: 'Indéterminé'
    },
    {
      id: 2, region: 'Sud', departement: 'Abidjan', sousPrefecture: 'Treichville',
      nom: 'Dupont', prenom: 'Marie', genre: 'Femme', age: 28,
      poste: 'Designer', type: 'CDD', statutContrat: 'Actif', dureeContrat: '12 mois'
    }
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }
}
