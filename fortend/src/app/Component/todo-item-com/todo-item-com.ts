import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from '../../Model/todo.type';
import { UppercasePipePipe } from '../../Pipes/uppercase-pipe-pipe';
@Component({
  selector: 'app-todo-item-com',
  imports: [UppercasePipePipe, DatePipe, TitleCasePipe],
  templateUrl: './todo-item-com.html',
  styleUrl: './todo-item-com.css',
})
export class TodoItemCom {
  todo = input.required<Todo> ();
  todoToggled = output<Todo>() ;
  todoEdited = output<Todo> ();
  todoDeleted = output<Todo>();
  editRequested = output<Todo>();

  showPriorityDropdown = false;
showStatusDropdown = false;

  onEdit() {
    this.editRequested.emit(this.todo()); 
  }

  todoClicked(){
    this.todoToggled.emit(this.todo());
  }



  onDelete() {
    this.todoDeleted.emit(this.todo());
  }

  togglePriorityDropdown(): void {
    this.showPriorityDropdown = !this.showPriorityDropdown;
    this.showStatusDropdown = false; 
}

toggleStatusDropdown(): void {
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showPriorityDropdown = false; 
}

onPriorityChange(pri: string): void {
    // Create updated todo object
    const updatedTodo = {...this.todo(), priority: pri as any, createdAt:new Date() , updatedAt:new Date() };
    console.log('Priority changed to:', updatedTodo);
    this.showPriorityDropdown = false;

    this.todoEdited.emit(updatedTodo);
}

onStatusChange(status: string): void {
    // Create updated todo object
    const updatedTodo = {...this.todo(), status: status as any, createdAt:new Date() , updatedAt:new Date() };
    console.log('Status changed to:', updatedTodo);
    this.showStatusDropdown = false; 
    // Emit the updated todo
    this.todoEdited.emit(updatedTodo);
}

  

}
