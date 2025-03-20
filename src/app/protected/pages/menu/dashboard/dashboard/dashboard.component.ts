import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {EmployeeService} from '../../../../../core/services/employee/employee.service';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalEmployes = 0;
  totalSuperviseurs = 0;
  tauxCroissance = 0;

  constructor(private employeeService: EmployeeService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadStatistics();
    setTimeout(() => this.loadCharts(), 500); // Attendre que le DOM charge
  }

  loadStatistics() {
    const employes = this.employeeService.getEmployees();
    this.totalEmployes = employes.length;
    this.totalSuperviseurs = employes.filter(emp => emp.poste === 'Superviseur').length;
    this.tauxCroissance = (this.totalEmployes / 100) * 10; // Exemple de calcul
  }

  loadCharts() {
    new Chart('repartitionChart', {
      type: 'pie',
      data: {
        labels: ['Hommes', 'Femmes'],
        datasets: [{
          data: [60, 40], // Exemple de données
          backgroundColor: ['#198754', '#ffc107']
        }]
      }
    });

    new Chart('evolutionChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr'],
        datasets: [{
          label: 'Effectifs',
          data: [50, 70, 90, 110],
          borderColor: '#198754',
          fill: false
        }]
      }
    });
  }
}
