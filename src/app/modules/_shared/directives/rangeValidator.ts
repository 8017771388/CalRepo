import { Validator, NG_VALIDATORS, ValidatorFn, FormControl } from '@angular/forms'
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[rangeValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: rangeValidatorDirective, multi: true }
    ]
})
export class rangeValidatorDirective implements Validator {
    @Input("minRange") minRange: number
    @Input("maxRange") maxRange: number

    validator: ValidatorFn;
    constructor() {
        this.validator = this.rangeValidator();
    }
    validate(c: FormControl) {
        return this.validator(c);
    }
    rangeValidator(): ValidatorFn {
        return (c: FormControl) => {
            if (c.value != null && c.value !== '') {
                let isValid = false; var p = '';
                if (!(c.value === null || c.value === '' || c.value === undefined))
                    p = c.value.replace(/,/g, '');
                let v: number = +(p);


                if (isNaN(v) || c.value == null || c.value === '' || c.value == undefined) {
                    //return { 'gte': false, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
                    return null;
                   // return { rangeValidator: { gte: true } };
                }

                if (v < +this.minRange) {
                    //return { 'gte': true, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
                    return { rangeValidator: { gte: false } };
                }
                if (v > +this.maxRange) {
                    //return { 'gte': true, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
                    return { rangeValidator: { gte: false } };
                }
                //return { 'gte': false, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
                return null;
                //return { rangeValidator: { gte: true } };
            
            }
         

        }
    } 
   /* validate(c: FormControl) {
        var p = '';
        
        if (!(c.value === null || c.value === '' || c.value === undefined))
            p = c.value.replace(/,/g, '');
        let v: number = +(p);
        
        
        if (isNaN(v)||c.value==null||c.value===''||c.value==undefined) {
            return { 'gte': false, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
        }

        if (v < +this.minRange) {
            return { 'gte': true, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange}
        }
        if (v > +this.maxRange) {
            return { 'gte': true, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
        }
        return { 'gte': false, 'requiredMinValue': this.minRange, 'requiredMaxValue': this.maxRange }
    }*/

}
