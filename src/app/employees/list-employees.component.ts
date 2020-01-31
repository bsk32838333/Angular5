import { Component, OnInit } from '@angular/core';

import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  //selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees : Employee[] = [];
  filteredEmployees : Employee[] = [];
  employeeToDisplay : Employee;
  searchTerm : string;
  private arrayIndex = 1;

  /** 
   * Service is included in the constructor so when angular initiates this component,
   *   automatically it injects this service as well 
  **/
  constructor( private _employeeService : EmployeeService, 
               private _router : Router,
               private _route : ActivatedRoute ) 
               { 
                  this.employees = this._route.snapshot.data['employeeList'];
                  this.filteredEmployees = this.employees;
               };

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
  }

  nextEmployee() : void {

    if( this.arrayIndex < 3 ) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
 }

 onDeleteNotification( id : number ) {
    const i = this.filteredEmployees.findIndex( e => e.id === id );
    if( i !== -1 ) {
      this.filteredEmployees.splice( i, 1 );
    }
 }

  onClick(employeeId : Number) {
    this._router.navigate(['/employees', employeeId]);
  }

}
