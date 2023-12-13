import { Component, OnInit, ViewChild } from '@angular/core';
import { selectTodoById, selectTodos } from '../store/todos.selector';
import { Store, select } from '@ngrx/store';
import { invokeDeleteTodoAPI, invokeTodosAPI, invokeUpdateTodoAPI } from '../store/todos.action';
import { AsyncPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { setAPIStatus } from '../../shared/store/app.action';
import { selectAppState } from '../../shared/store/app.selector';
import { Appstate } from '../../shared/store/appstate';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private store: Store, private appStore: Store<Appstate>, public dialog: MatDialog) { }
  todos$ = this.store.pipe(select(selectTodos)).subscribe((data: any) => {
    this.dataSource = new MatTableDataSource(data);
  });
  displayedColumns: string[] = ['id', 'taskTitle', 'taskDetails', 'status', 'action'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  ngOnInit(): void {
    this.store.dispatch(invokeTodosAPI());
  }

  delete(id: any) {
    const message = `Are you sure you wish to delete this todo?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(
          invokeDeleteTodoAPI({
            id: id,
          })
        );
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
          }
        });
      }
    });


  }

  completeTodo(id: any) {
    const message = `Are you sure you wish to complete this todo?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        let fetchData$ = this.store.pipe(select(selectTodoById(id))
        );
        fetchData$.pipe(take(1)).subscribe((data) => {
          if (data) {
            let todo = { ...data };
            todo.status = 'Completed';
            this.store.dispatch(
              invokeUpdateTodoAPI({ updateTodo: { ...todo } })
            );
            let apiStatus$ = this.appStore.pipe(select(selectAppState));
            apiStatus$.subscribe((apState) => {
              if (apState.apiStatus == 'success') {
                this.appStore.dispatch(
                  setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
                );
                this.store.dispatch(invokeTodosAPI());
              }
            });
          }
          else {

          }

        });
      }
    });

  }
}
