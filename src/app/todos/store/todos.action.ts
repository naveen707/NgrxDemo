import { createAction, props } from '@ngrx/store';
import { Todos } from './todos';


export const invokeTodosAPI = createAction(
    '[Todos API] Invoke Todos Fetch API'
);

export const todosFetchAPISuccess = createAction(
    '[Todos API] Fetch API Success',
    props<{ allTodos: Todos[] }>()
);

export const invokeSaveNewTodoAPI = createAction(
    '[Todos API] Inovke save new todo api',
    props<{ newTodo: Todos }>()
);

export const saveNewTodoAPISucess = createAction(
    '[Todos API] save new todo api success',
    props<{ newTodo: Todos }>()
);

export const invokeUpdateTodoAPI = createAction(
    '[Todos API] Inovke update todo api',
    props<{ updateTodo: Todos }>()
);

export const updateTodoAPISucess = createAction(
    '[Todos API] update  todo api success',
    props<{ updateTodo: Todos }>()
);

export const invokeDeleteTodoAPI = createAction(
    '[Todos API] Inovke delete todo api',
    props<{ id: number }>()
);

export const deleteTodoAPISuccess = createAction(
    '[Todos API] deleted todo api success',
    props<{ id: number }>()
);