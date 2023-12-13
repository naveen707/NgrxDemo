import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
          import('./todos/todos.module').then((t) => t.TodosModule),
      },
];

