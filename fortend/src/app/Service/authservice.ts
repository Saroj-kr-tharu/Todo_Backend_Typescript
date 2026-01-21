import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  
  http = inject(HttpClient);
  
  baseUrl= environment.API_BASE_URL; 


  loginService(data:any){
    return this.http.post(`${this.baseUrl}/login`, data)
  }
  
  registerService(data:any){
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

}
