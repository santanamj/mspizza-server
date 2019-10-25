import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 2): ValidatorFn {
  return function validate (formGroup: FormGroup) {
    let checked = 0;
    const myform =  this.productscar.forEach(() => {
        const control = new FormControl(); // if first item set to true, else false
        (this.form.controls.sabores as FormArray).push(control);
      });
    Object.keys(myform).forEach(key => {
        
      const control = myform[key];

      if (control.value === true) {
        checked ++;
      }
    });

    if (checked < minRequired) {
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
