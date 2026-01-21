import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { TodoItemCom } from '../../Component/todo-item-com/todo-item-com';
import { Todo } from '../../Model/todo.type';
import { SearchPipePipe } from '../../Pipes/search-pipe-pipe';
import { TodoService } from '../../Service/todo-service';

@Component({
  selector: 'app-todos-component',
  imports: [TodoItemCom, FormsModule, SearchPipePipe, ReactiveFormsModule, ],
  templateUrl: './todos-component.html',
  styleUrl: './todos-component.css',
})
export class TodosComponent implements OnInit {
  
  todoItem = signal <Array<Todo> >  ([])
  searchTerm = signal('')
  todoservice = inject(TodoService)
  toast = inject(HotToastService)
  router = inject(Router)

  showTodoForm = false;
  isEditMode = false; 
  editingTodo: Todo | null = null; 



  todoForm: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl(''), 
        status: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required]),
        due_date: new FormControl('', [Validators.required]),
        
      });

  ngOnInit(): void {
    this.loadTodos()
  }

  loadTodos(){
     this.todoservice.getAllTodosByUser()
    .pipe(
         this.toast.observe({
          loading: 'Loading Todos...',
          
          success: 'Sucessfully Loaded Todos!',
          error: 'Loading Todos Failed.',
        })
    )
    .subscribe({
      next: (response: any) => {
            console.log(response?.data)
            this.todoItem.set(response?.data)

            localStorage.setItem('Todos', JSON.stringify(response?.data));
          
      },
      error: (error) => {
        console.log(error?.error)
      }

    });
  }


  
toggleTodoForm() {
  this.showTodoForm = !this.showTodoForm;
   if (this.showTodoForm && !this.isEditMode) {
      this.todoForm.reset();
    }
}

closeTodoForm() {
  this.showTodoForm = false;
    this.isEditMode = false;
    this.editingTodo = null;
    this.todoForm.reset();
}



handleEditRequest(todo: Todo) {
    this.isEditMode = true;
    this.editingTodo = todo;
    this.showTodoForm = true;
    
    // Pre-fill form with existing values
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
      due_date: todo.due_date
    });
  }


onSubmit() {
    if (this.todoForm.valid) {
      const formData = this.todoForm.value;
      const userData:any = localStorage.getItem("todoAppUser");
      const stringData:any = JSON.parse(userData);
      
      if (this.isEditMode && this.editingTodo) {
        // Handle edit
        const updatedTodo = {
          ...this.editingTodo,
          ...formData,
          updatedAt: new Date()
        };
        
        this.todoservice.editTodos(updatedTodo, updatedTodo.id)
        .pipe(
          this.toast.observe({
            loading: 'Updating Todo...',
            success: 'Successfully Updated Todo!',
            error: 'Updating Todo Failed.',
          })
        )
        .subscribe({
          next: (response) => {
            const currentTodos = this.todoItem();
            const updatedTodos = currentTodos.map( 
              (item) => {
                if(item.id === updatedTodo.id){
                  return updatedTodo;
                }
                return item;
              }
            );
            this.todoItem.set(updatedTodos);
            localStorage.setItem('Todos', JSON.stringify(updatedTodos));
            this.closeTodoForm();
          },
          error: (error) => {
            console.log(error?.error);
          }
        });
      }
      else {
        // Handle add new todo
        const newTodo = {...formData, user_id: stringData.id};
        console.log('new Todo => ', newTodo)
        this.todoservice.addTodos(newTodo)
        .pipe(
          this.toast.observe({
            loading: 'Adding Todo...',
            success: 'Successfully Added Todo!',
            error: 'Adding Todo Failed.',
          })
        )
        .subscribe({
          next: (response) => {
            const currentTodos = this.todoItem();
            const updatedTodos = [...currentTodos, newTodo];
            this.todoItem.set(updatedTodos);
            localStorage.setItem('Todos', JSON.stringify(updatedTodos));
            this.closeTodoForm();
          },
          error: (error) => {
            console.log(error?.error);
          }
        });
      }
    }
  }


  handleTodoEdit(todo: Todo) {
    // Handle direct edits from dropdowns
    console.log('Todo edited:', todo);

    this.todoservice.editTodos(todo , todo.id)
    .pipe(
      this.toast.observe({
        loading: 'Editing Todo...',
        success: 'Successfully Edited Todo!',
        error: 'Editing Todo Failed.',
      })
    )
    .subscribe({
      next: (response) => {
        const currentTodos = this.todoItem();
        const updatedTodos = currentTodos.map( 
          (item) => {
            if(item.id === todo.id){
              return {...todo};
            }
            return item;
          }
        );
        this.todoItem.set(updatedTodos);
         localStorage.setItem('Todos', JSON.stringify(updatedTodos));
      },
      error: (error) => {
        console.log(error?.error?.message);
      }
    });
  }


handleTodoDelete(todo: Todo) {
  
  console.log('Todo deleted:', todo);
  this.todoservice.deleteTodos(todo.id)
  .pipe(
     this.toast.observe({
          loading: 'Deleting Todo...',
          
          success: 'Sucessfully Delete Todos!',
          error: 'Deleting Todos Failed.',
        })
  )
  .subscribe(
    {
      next: (response) => {
        const currentTodos = this.todoItem();
        const updatedTodos = currentTodos.filter(  (item) =>  item.id !==todo.id )
        this.todoItem.set(updatedTodos);
        localStorage.setItem('Todos', JSON.stringify(updatedTodos));

      },
      error: (error) => {
        console.log(error?.error?.message)
      }
    }
  )

}




}
