import { Component, OnInit,Input } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee?: Employee;
  constructor(
            private route: ActivatedRoute,
            private employeeService: EmployeeService,
            private location: Location
             ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee():void{
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployee(employeeId)
      .subscribe(e => this.employee = e);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee)
        .subscribe(() => this.goBack());
    }
  }
}
