import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  
  http = inject(HttpClient);
  
  baseUrl= `http://localhost:3000/api/v1/auth`


  loginService(data:any){
    return this.http.post(`${this.baseUrl}/login`, data)
  }
  
  registerService(data:any){
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

}
