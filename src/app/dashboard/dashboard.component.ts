import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }
  employees: Employee[] = [];

  getEmployees():void{
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees.slice(1,5));
  }

}
