import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CreateEmployeeComponent } from "./create-employee.component";
import { Injectable } from "@angular/core";

/**
 * CanDeactivate guard should implement CanDeactivate Interface.
 * CanDeactivate Interface is going to be used in CreateEmployeeComponent so its used as generic.
 */
@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent> {

    canDeactivate( component : CreateEmployeeComponent ) : boolean {

        if( component.createEmployeeForm.dirty ) {
            return confirm( 'Are you sure you want to discard the changes?' );
        }

        return true;
    }
}