import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { mockTodo1, mockTodo2, mockTodo3, mockTodoArray } from './mockTodos';
import { TodosService } from './todos.service';
import { Todos } from './store/todos';

describe('TodosService', () => {
  let service: TodosService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TodosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllTodos and return an array of Todos', () => {
    service.get().subscribe((res) => {
      expect(res).toEqual(mockTodoArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/tasks`,
    });

    req.flush(mockTodoArray);
  });



  it('should call updateTodo and return the updated todo from the API', () => {
    const updatedTodo: Todos = {
      id: 101,
      taskTitle: 'New title',
      taskDetails: 'desc 1',
      status: 'Pending'
    };

    service.update(mockTodo1).subscribe((data) => {
      expect(data).toEqual(updatedTodo);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/tasks/${updatedTodo.id}`,
    });

    req.flush(updatedTodo);
  });

  it('should call addTodo and the API should return the todo that was added', () => {
    service.create(mockTodo2).subscribe((data) => {
      expect(data).toEqual(mockTodo2);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/tasks`,
    });

    req.flush(mockTodo2);
  });

  it('should call deleteTodo and return the todo that was deleted from the API', () => {
    service.delete(mockTodo3.id!).subscribe((data) => {
      expect(data).toEqual(mockTodo3);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/tasks/${mockTodo3.id}`,
    });

    req.flush(mockTodo3);
  });
});