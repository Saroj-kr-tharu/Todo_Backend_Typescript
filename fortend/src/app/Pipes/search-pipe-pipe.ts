import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../Model/todo.type';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {

  transform(todos: Todo[], searchTerm:string): Todo[] {

    if(!searchTerm){
      return todos;
    }

    const text= searchTerm.toLowerCase();
    return todos.filter( (todo)=> { 
      return (todo.title.toLowerCase().includes(text))
    } )
  }

}
