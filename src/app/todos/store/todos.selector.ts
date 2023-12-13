import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todos } from './todos';


export const selectTodos = createFeatureSelector<Todos[]>('myTodos');

export const selectTodoById = (todoId: number) =>
  createSelector(selectTodos, (todos: Todos[]) => {
    var todobyId = todos.filter((_) => _.id == todoId);
    if (todobyId.length == 0) {
      return null;
    }
    return todobyId[0];
  });