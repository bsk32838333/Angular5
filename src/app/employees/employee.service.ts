import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

@Injectable()
export class EmployeeService {
    
    private listEmployees : Employee[] = [
        
    {
        id : 200173,
        name : 'Saravanakumar Boopathi',
        gender : 'Male',
        email : 'saravana.bsk@gmail.com',
        phoneNumber : 7323187572,
        contactPreference : 'Email',
        dateOfBirth : new Date('06/26/1986'),
        department : '1',
        isActive : true,
        photoPath : 'assets/images/emp_03.jpg'
      },
      {
        id : 200174,
        name : 'Ram Pranav Saravanakumar',
        gender : 'Male',
        email : 'ram.saravana@gmail.com',
        phoneNumber : 7323187573,
        contactPreference : 'Email',
        dateOfBirth : new Date('07/06/2014'),
        department : '2',
        isActive : true,
        photoPath : 'assets/images/emp_02.jpg'
      },
      {
        id : 200175,
        name : 'Vidhya Jeganathan',
        gender : 'Female',
        email : 'vidhya2388@gmail.com',
        phoneNumber : 9197716453,
        contactPreference : 'Phone',
        dateOfBirth : new Date('09/23/1988'),
        department : '3',
        isActive : true,
        photoPath : 'assets/images/emp_01.jpg'
      }
   
    ];

    getEmployees() : Employee[] {
        return this.listEmployees;
    };

    getEmployee(id : Number) : Employee {
      return this.listEmployees.find(e => e.id === id);
  };

    save( employee : Employee ) {

      if( employee.id === null ) {
        const maxID = this.listEmployees.reduce( function( e1, e2 ) {
          return ( e1 > e2 ? e1 :e2 )
        } ).id;

        employee.id = maxID + 1;
        this.listEmployees.push( employee );

      } else {
        const foundIndex = this.listEmployees.findIndex( e => e.id === employee.id );
        this.listEmployees[foundIndex] = employee;
      }
    }

    deleteEmployee( id : number ) {
      const i = this.listEmployees.findIndex( e => e.id === id );
      if( i !== -1 ) {
        this.listEmployees.splice( i, 1 );
      }
    }
}