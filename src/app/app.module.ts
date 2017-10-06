import { TodoListComponent } from './todoComponent/todo.list.component';
import { TodoComponent } from './todoComponent/todo.component';
import { TodosComponent } from './todoComponent/todos.component';
import { TodoService } from './todoComponent/services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
