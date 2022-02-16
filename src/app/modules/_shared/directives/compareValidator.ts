import { AbstractControl, Validator, NG_VALIDATORS, ValidatorFn, FormControl, FormGroup } from '@angular/forms'
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[compareValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: compareValidatorDirective, multi: true }
    ]
})
export class compareValidatorDirective implements Validator {
    @Input("compareTo") compareTo: string;
    validator: ValidatorFn;
    constructor() {
        this.validator = this.compareValidator();
    }
    validate(c: FormControl) {
        return this.validator(c);
    }
    compareValidator(): ValidatorFn {
        return (c: AbstractControl) => {

            if (c && c instanceof FormControl) {
                let group = c as FormControl;
                let compareData = null;
                let focusedFieldValue = null;
                let pattern = /^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/;
                //Check Special Charaecter

                if (!(c.value === null || c.value === undefined || c.value === '' || parseInt(c.value) === 0)) {

                    //var isValidAdv = (pattern.test(c.parent.get('T12_Advisory_GDC').value));
                    //var isValidBrk = (pattern.test(c.parent.get('T12_Brokerage_GDC').value));

                    //console.log(c.parent.get('T12_Advisory_GDC').value);
                    //console.log(isValidAdv);

                    //console.log(c.parent.get('T12_Brokerage_GDC').value);
                    //console.log(isValidBrk);
                    if (c.parent.get('T12_Advisory_GDC').value <= 100000000 || c.parent.get('T12_Advisory_GDC').value === null || c.parent.get('T12_Advisory_GDC').value === undefined) {
                        //if (isValidAdv && isValidBrk)
                        c.parent.get('T12_Advisory_GDC').setErrors(null);
                    }
                    if (c.parent.get('T12_Brokerage_GDC').value <= 100000000 || c.parent.get('T12_Brokerage_GDC').value === null || c.parent.get('T12_Brokerage_GDC').value === undefined)
                        //if (isValidAdv && isValidBrk)
                        c.parent.get('T12_Brokerage_GDC').setErrors(null);

                    //c.parent.get('T12_Brokerage_GDC').setErrors({ brokarage: null }); //c.parent.get('T12_Brokerage_GDC').updateValueAndValidity();
                    return null;
                }

                focusedFieldValue = parseInt(c.value) || 0;
                if (this.compareTo === 'Brokarage')
                    compareData = parseInt(c.parent.value['T12_Brokerage_GDC']) || 0;
                else if (this.compareTo === 'Advisory')
                    compareData = parseInt(c.parent.value['T12_Advisory_GDC']) || 0;

                console.log('focusValue = ' + focusedFieldValue + ' - compareData= ' + compareData);

                if (compareData <= 0 && focusedFieldValue <= 0) {
                    if (this.compareTo === 'Advisory')   ///show the msg under brokarage field
                        return { brokarage: { gte: false } };

                    if (this.compareTo === 'Brokarage')   //show the msg under Advisory field
                        return { advisory: { gte: false } };
                }
                else {
                    return null;
                }

                // console.log("T12_Advisory_GDC = "+ c.parent.value['T12_Advisory_GDC']);
                //console.log("T12_Brokerage_GDC = " + c.parent.value['T12_Brokerage_GDC']);
                //console.log(group.get('T12_Advisory_GDC').value);
                // console.log(group.get('T12_Brokerage_GDC').value);
                return null;
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
