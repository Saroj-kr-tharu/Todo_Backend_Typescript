import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemCom } from './todo-item-com';

describe('TodoItemCom', () => {
  let component: TodoItemCom;
  let fixture: ComponentFixture<TodoItemCom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemCom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemCom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
