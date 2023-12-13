import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todos } from './store/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Todos[]>('http://localhost:3000/tasks');
  }

  create(payload: Todos) {
    return this.http.post<Todos>('http://localhost:3000/tasks', payload);
  }

  update(payload: Todos) {
    return this.http.put<Todos>(
      `http://localhost:3000/tasks/${payload.id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }
}
