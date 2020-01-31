import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee : Employee;
  private _id : number;

  constructor( private _route : ActivatedRoute, 
               private _employeeService : EmployeeService,
               private _router : Router ) { }

  //snapshot property from ActivatedRoute is used for reading the route parameters
  // name 'id' should match with the name given in the route configuration in app.module.ts for route /employees/id
  // + symbol is to type cast the string to number since this snapshot property returns a string
  ngOnInit() {
    /** When using the snapshot property, angular do not get notified of changes to URL.
      * To get the notification to angular on URL changes, we need to subscribe to the Observable property.
      * To make use of observable property we commented out this below code that uses snapshot.
      * When clicked on "View Next Employee" button just the URL changed but employee details dint. 
      * So we moved from snapshot approach to observable approach.
      * 
      * More details on snapshot VS observable can be found in the Angular_Files_info.txt
    **/ 
    //this._id = +this._route.snapshot.paramMap.get('id');

    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this.employee = this._employeeService.getEmployee(this._id);
    });
  }

  viewNextEmployee() {
    if(this._id < 200175) {
      this._id = this._id + 1;
    } else {
      this._id = 200173;
    }
    this._router.navigate(['/employees', this._id]);
  }
}
