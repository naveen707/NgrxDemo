import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { setAPIStatus } from '../../shared/store/app.action';
import { selectAppState } from '../../shared/store/app.selector';
import { Appstate } from '../../shared/store/appstate';
import { Todos } from '../store/todos';
import { invokeSaveNewTodoAPI, invokeUpdateTodoAPI } from '../store/todos.action';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { selectTodoById } from '../store/todos.selector';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  public taskForm!: FormGroup;
  taskDetails!: FormControl;
  taskTitle!: FormControl;
  priority!: FormControl;
  id!: FormControl;
  task!: Todos;
  formMode!: 'add' | 'edit';
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {

    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectTodoById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.task = { ...data };
        this.formMode = 'edit';
      }
      else {
        this.formMode = 'add';
      }
      this.initTaskForm();
    });

  }

  public initTaskForm(): void {
    this.taskForm = this.fb.group({
      id: [this.task !== undefined ? this.task.id : 0, [Validators.required]],
      taskDetails: [
        this.task !== undefined ? this.task.taskDetails : ''],
      taskTitle: [this.task !== undefined ? this.task.taskTitle : '',
      [Validators.required]],
      priority: [this.task !== undefined ? this.task.priority : 'Medium',
      [Validators.required]],
    });

    this.id = this.taskForm.controls['id'] as FormControl;
    this.taskDetails = this.taskForm.controls['taskDetails'] as FormControl;
    this.taskTitle = this.taskForm.controls['taskTitle'] as FormControl;
    this.priority = this.taskForm.controls['priority'] as FormControl;

  }


  save() {
    if (this.taskForm.valid) {
      if (this.formMode == 'add') {
        this.task = this.taskForm.value;
        this.task.status = "Pending";
        this.store.dispatch(invokeSaveNewTodoAPI({ newTodo: this.task }));
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            this.router.navigate(['/']);
          }
        });
      }
      else {
        this.store.dispatch(
          invokeUpdateTodoAPI({ updateTodo: { ...this.taskForm.value } })
        );
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            this.router.navigate(['/']);
          }
        });
      }
    }
  }
}
