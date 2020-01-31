import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  // ViewChild decorator is used for getting the form value in the component.
  // Then creating a public variable so that the form value can be referenced in other classes too
  @ViewChild('employeeForm') 
  public createEmployeeForm : NgForm;

  panelTitle : string;
  previewPhoto = false;

  datepickerConfig : Partial<BsDatepickerConfig>;

  employee : Employee;

  departments : Department[] = [
    { id : 1, name : 'Help Desk' },
    { id : 2, name : 'IT' },
    { id : 3, name : 'HR' },
    { id : 4, name : 'Payroll' },
    { id : 5, name : 'Admin' }
  ];

  constructor( private _employeeService : EmployeeService, 
               private _router  : Router,
               private _route : ActivatedRoute ) {

    this.datepickerConfig = Object.assign ({}, 
      { 
        containerClass : 'theme-dark-blue', 
        showWeekNumbers : false,
        dateInputFormat : 'MM-DD-YYYY' 
      });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe( parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    } );
  }

  private getEmployee( id : number ) {
    if( id === 0 ) {
      this.employee = 
      {
        id : null,
        name : null,
        gender : null,
        email : null,
        phoneNumber : null,
        contactPreference : null,
        dateOfBirth : null,
        department : "-1",
        isActive : null,
        photoPath : null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this.employee = Object.assign({}, this._employeeService.getEmployee( id ) );
    }
  }


  /**
   * Method to save the new Employee
   * create a copy / clone the employee object so that the created employee details are retained to save
   * even though the form is reset.
   * 
   * Object.assign() method is used for cloning
   */
  saveEmployee( ) : void {
    const newEmployee : Employee = Object.assign({}, this.employee);
    this._employeeService.save( newEmployee );
    this.createEmployeeForm.reset();
    this._router.navigate( ['list'] );
  }
}
