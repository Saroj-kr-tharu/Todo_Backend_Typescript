import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';

import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormFieldConfig, ValidationConfig } from '../../Model/FormSignin.type';
import { Authservice } from '../../Service/authservice';



@Component({
  selector: 'app-signupcomponent',
  imports: [ReactiveFormsModule ],
  templateUrl: './signupcomponent.html',
  styleUrl: './signupcomponent.css',
})
export class Signupcomponent {

    authService = inject(Authservice)
    toast = inject(HotToastService)
    rotuer = inject(Router)

    passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const repeatPassword = control.get('repeatpassword');
        
        if (!password || !repeatPassword) {
          console.log(`password => ${password} and repeat => ${repeatPassword} `)
            return null;
        }
        
        return password.value === repeatPassword.value ? null : { passwordMismatch: true };
    };

    // Custom validator for repeat password field
    repeatPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!this.signupForm) return null;
        
        const password = this.signupForm.get('password');
        if (!password) return null;
        
        return password.value === control.value ? null : { passwordMismatch: true };
    };
    
      signupForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]), 
        username: new FormControl('', [Validators.required, Validators.minLength(2)]),
        repeatpassword: new FormControl('', [
            Validators.required, 
            Validators.minLength(6),
            this.repeatPasswordValidator
        ]),
      }, { validators: this.passwordMatchValidator });

        
   signupFormConfig : FormFieldConfig[] = [
    { type: 'email', id: 'email', label: 'email Address', placeholder:'Enter email ... ', autocomplete: 'email', validation: { 'required': 'email is required', 'email': 'Please enter a valid email address' } },
    { type: 'text', id: 'username', label: 'Username', placeholder:'Enter username ..', autocomplete: 'name', validation: {'required': 'username is required', 'minlength':'minlength 2 char '} },
    { type: 'password', id: 'password', label: 'Password', placeholder:'Enter password .. ', autocomplete: 'current-password', validation: { 'required': 'Password is required', 'minlength': 'Password must be at least 6 characters long' } },
    { type: 'password', id: 'repeatpassword', label: 'Repeat Password', placeholder:'Repeat password .. ', autocomplete: 'current-password', validation: { 'required': 'Password is required', 'minlength': 'Password must be at least 6 characters long', 'passwordMismatch': 'Passwords do not match' } },
    
  ];


  


get passwordMismatch() {
  return (this.signupForm.hasError('passwordMismatch') || this.signupForm.get('repeatpassword')?.hasError('passwordMismatch')) && 
         (this.signupForm.get('password')?.touched || this.signupForm.get('repeatpassword')?.touched);
}


     markFormGroupTouched() {
        Object.keys(this.signupForm.controls).forEach(field => {
            const control = this.signupForm.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
    }



  getValidationKeys(validation: ValidationConfig): string[] {
    return Object.keys(validation);
}

    onSaveUser(){
      const formValue = this.signupForm.value;
      this.authService.registerService(formValue)
      .pipe(
          
        this.toast.observe({
          loading: 'Registering...',
          
          success: 'Sucessfully Register!',
          error: 'Register Failed.',
        })
      )
      
      .subscribe({
        next: (response:any)=> {
          console.log(response?.data)
          this.rotuer.navigateByUrl('/login')
        },
        error: (error) => {
          this.toast.error(error?.error?.message)
          console.log(error?.error?.message)
        }
      })
    }

}