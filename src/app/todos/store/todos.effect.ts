import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { TodosService } from '../todos.service';
import { deleteTodoAPISuccess, invokeDeleteTodoAPI, invokeSaveNewTodoAPI, invokeTodosAPI, invokeUpdateTodoAPI, saveNewTodoAPISucess, todosFetchAPISuccess, updateTodoAPISucess } from './todos.action';
import { selectTodos } from './todos.selector';
import { Appstate } from '../../shared/store/appstate';
import { setAPIStatus } from '../../shared/store/app.action';

@Injectable({ providedIn: "root" })
export class TodosEffect {
    constructor(
        private actions$: Actions,
        private todosService: TodosService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeTodosAPI),
            withLatestFrom(this.store.pipe(select(selectTodos))),
            mergeMap(([, todoformStore]) => {
                if (todoformStore.length > 0) {
                    return EMPTY;
                }
                return this.todosService
                    .get()
                    .pipe(map((data) => todosFetchAPISuccess({ allTodos: data })));
            })
        )
    );

    saveNewTodo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeSaveNewTodoAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.todosService.create(action.newTodo).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            })
                        );
                        return saveNewTodoAPISucess({ newTodo: data });
                    })
                );
            })
        );
    });

    updateTodoAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeUpdateTodoAPI),
            switchMap((action) => {
                this.appStore.dispatch(
                    setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                return this.todosService.update(action.updateTodo).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({
                                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                            })
                        );
                        return updateTodoAPISucess({ updateTodo: data });
                    })
                );
            })
        );
    });

    deleteTodosAPI$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(invokeDeleteTodoAPI),
          switchMap((actions) => {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            return this.todosService.delete(actions.id).pipe(
              map(() => {
                this.appStore.dispatch(
                  setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                  })
                );
                return deleteTodoAPISuccess({ id: actions.id });
              })
            );
          })
        );
      });
}