import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
declare var jquery:any;
declare var $ :any;
 @Component({
     selector: 'app-todo',
     templateUrl: './views/todo.component.html',
     styleUrls: ['./views/todo.component.css']
 })
export class TodoComponent implements OnInit {
    @Input() todo:Todo;
    @Input() index :number;

    constructor(private todoService:TodoService){}
    onEdit(event){
        this.todoService.editTodoClick(this.todo);
    }
    onMore(){
        $('#'+this.index).slideToggle('normal');
    }
    onDelete(event){
        this.todoService.deleteTodo(this.todo);
    }

    statusChange(){
        this.todo.status = !this.todo.status;
        this.todoService.updateTodo(this.todo);
    }
    ngOnInit() {
        $('.bottom-todo').slideUp(0);
    }
}