// list-employe.component.ts
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../core/models/employee.model';
import { EmployeeService } from '../../../../../core/services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { EmployeModalComponent } from '../employe-modal/employe-modal.component';

@Component({
  standalone: true,
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss'],
  imports: [CommonModule, EmployeModalComponent]
})
export class ListEmployeComponent implements OnInit {
  employes: Employee[] = [];
  showModal = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployes();
  }

  getEmployes() {
    this.employes = this.employeeService.getEmployees();
  }

  ajouterEmploye() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee);
    this.getEmployes();
    this.showModal = false;
  }

  modifierEmploye(employe: Employee) {
    console.log('Modification de', employe);
    // Implement edit functionality later
  }

  supprimerEmploye(employe: Employee) {
    this.employeeService.deleteEmployee(employe.id);
    this.getEmployes();
  }

  exportToPDF() {
    console.log('Exporting to PDF...');
    // Implement PDF export functionality
  }

  exportToExcel() {
    console.log('Exporting to Excel...');
    // Implement Excel export functionality
  }
}
