import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormFieldConfig, ValidationConfig } from '../../Model/FormSignin.type';
import { Authservice } from '../../Service/authservice';

@Component({
  selector: 'app-logincomponent',
  imports: [ReactiveFormsModule,  ],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {

  authService = inject(Authservice)
  toast = inject(HotToastService)
  router = inject(Router)
  
   signupForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), ]), 

      });

        
   signupFormConfig : FormFieldConfig[] = [
    { type: 'email', id: 'email', label: 'Email Address', placeholder:'email ... ', autocomplete: 'email', validation: { 'required': 'Email is required', 'email': 'Please enter a valid email address' } },
    { type: 'password', id: 'password', label: 'password', placeholder:'password .. ', autocomplete: 'current-password', validation: { 'required': 'password is required', 'minlength': 'password must be at least 6 characters long' } },
  ];

  getValidationKeys(validation: ValidationConfig): string[] {
    return Object.keys(validation);
}

    onSaveUser(){

     

      const formValue = this.signupForm.value;
      
      this.authService.loginService(formValue)
      .pipe(
          
        this.toast.observe({
          loading: 'Login...',
          
          success: 'Sucessfully Login!',
          error: 'Login Failed.',
        })
      )
      .subscribe({
        next: (response: any ) =>  { 
          localStorage.setItem('todoAppToken', response?.data?.jwt)
          localStorage.setItem('todoAppUser', JSON.stringify(response.data));
          // console.log(response?.data)
          this.router.navigateByUrl('/todos')
        },
        error: (error) => {
          console.log(error?.error)
        }
      })
    }

}
