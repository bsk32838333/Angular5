import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector : '[appSelectValidator]',
    providers : [{ //Providers are used for registering the custom Validator with other default Angular Validator
        provide : NG_VALIDATORS,
        useExisting : SelectRequiredValidatorDirective,
        multi : true
    }]
})
export class SelectRequiredValidatorDirective implements Validator {
    // Using the alias of the directive name in the Input property.
    // If alias is not used then directive name 'appSelectValidator' should be the Input property name
    @Input('appSelectValidator')
    defaultValue : string;

    validate( control : AbstractControl ) : { [key : string] : any } | null {
        return control.value === this.defaultValue ? { 'defaultSelected' : true } : null;
    }
}