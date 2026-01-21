import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { Todo } from '../Model/todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  httpClient = inject(HttpClient);
  
  baseUrl= `http://localhost:3000/api/v1/task`  

  toast=inject(HotToastService)
  router = inject(Router)

   getAllTodosByUser(){

    
  const userString = localStorage.getItem('todoAppUser'); 
  const userData = JSON.parse(userString!);               

  console.log('user id => ', userData.id);

    if(userData == null){
      this.toast.warning('Login Again !')
      this.router.navigateByUrl('/login')
      
    }
    return  this.httpClient.get<Array<Todo>>(`${this.baseUrl}s?userId=${userData?.id}`);    
   }


   deleteTodos(id:number){
    return  this.httpClient.delete(`${this.baseUrl}/delete?id=${id}`);    
    }

  addTodos(data:any){
    return  this.httpClient.post(`${this.baseUrl}/add`, data );    
    }

    
  editTodos(data:any, id:number){
    return  this.httpClient.patch(`${this.baseUrl}/update?id=${id}`, data );    
    }

  
}
