import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { todoReducer } from './store/todos.reducer';
import { StoreModule } from '@ngrx/store';
import { TodosEffect } from './store/todos.effect';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../shared/material.module';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [AddComponent, HomeComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    StoreModule.forFeature('myTodos', todoReducer),
    EffectsModule.forFeature([TodosEffect]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TodosModule { }
