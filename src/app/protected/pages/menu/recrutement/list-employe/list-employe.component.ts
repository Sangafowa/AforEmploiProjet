import { Component, OnInit } from '@angular/core';
import {Employee} from '../../../../../core/models/employee.model';
import {EmployeeService} from '../../../../../core/services/employee/employee.service';

@Component({
  standalone:true,
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {
  employes: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployes();
  }

  getEmployes() {
    this.employes = this.employeeService.getEmployees();
  }

  ajouterEmploye() {
    console.log('Ajout d’un nouvel employé');
  }

  modifierEmploye(employe: Employee) {
    console.log('Modification de', employe);
  }

  supprimerEmploye(employe: Employee) {
    this.employeeService.deleteEmployee(employe.id);
    this.getEmployes();
  }
}
