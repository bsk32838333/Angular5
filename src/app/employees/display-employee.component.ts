import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit { // OnChanges

  // Code to display the employee details using getters /setters
  private _employee : Employee;
  private selectedEmployeeId: number;

  confirmDelete = false;
  
  @Output() notifyDelete : EventEmitter<number> = new EventEmitter<number>();
  @Input() 
  
  set employee ( val : Employee ){
    this._employee = val;
  } 

  get employee() : Employee {
    return this._employee;
  }

  constructor( private _route : ActivatedRoute, 
               private _router : Router,
               private _employeeService : EmployeeService ) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employees', this._employee.id]);
  }

  editEmployee() {
    this._router.navigate(['/edit', this._employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee( this._employee.id ); 
    this.notifyDelete.emit( this._employee.id );
  }

  /**
   * This implemented method will be called on change event.
   * ngOnChanges life cycle hook is used for detecting the input property change values
   * @param changes : SimpleChanges - This will hold the object's previous and current value 
   * 
   * Commenting out the below code as getter /setter is going to be used to get the same functionality
   * Retaining this code just for the reference in future.
   */
 /**
   ngOnChanges( changes : SimpleChanges ) {

    const previousEmployee = <Employee>changes.employee.previousValue;
    const currentEmployee = <Employee>changes.employee.currentValue;
  }
  **/
}
