import { Component, OnInit,Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employee: Employee;
  constructor(
            private employeeService: EmployeeService,
            )  
            { 
              this.employee = {
                employeeId:0,
                employeeNum:'',
                firstName:'',
                lastName:'',
                employmentDate:new Date(2020,12,1),
                birthDate:new Date(),
                terminationDate:new Date(),
              }
            }

  ngOnInit(): void {
    this.getEmployees();
  }

   employees: Employee[] = [];

   getEmployees(): void {
    this.employeeService.getEmployees()
          .subscribe(employees => this.employees = employees);
  }
  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.removeEmployee(employee).subscribe();
  }

  onSubmit(): void{
    this.employeeService.addNewEmployee(this.employee)
      .subscribe(employee => {
        this.employees.push(employee.employee)
      });
  }
}
