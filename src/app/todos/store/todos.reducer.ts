import { createReducer, on } from "@ngrx/store";
import { Todos } from "./todos";
import { deleteTodoAPISuccess, saveNewTodoAPISucess, todosFetchAPISuccess, updateTodoAPISucess } from "./todos.action";


export const initialState: ReadonlyArray<Todos> = [];

export const todoReducer = createReducer(
    initialState,
    on(todosFetchAPISuccess, (state, { allTodos }) => {
        return allTodos;
    }),
    on(saveNewTodoAPISucess, (state, { newTodo }) => {
        let newState = [...state];
        newState.unshift(newTodo);
        return newState;
    }),
    on(updateTodoAPISucess, (state, { updateTodo }) => {
        let newState = state.filter((_) => _.id != updateTodo.id);
        newState.unshift(updateTodo);
        return newState;
    }),
    on(deleteTodoAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _.id != id);
        return newState;
    })
);