import { TodoService } from './services/todo.service';
import { Todo } from './model/todo.model';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-todo-list',
    templateUrl: './views/todo.list.component.html',
    styleUrls: ['./views/todo.list.component.css']
})
export class TodoListComponent implements OnInit {
    private todos: Todo[];
    private showForm = true;
    constructor(private todoService:TodoService){}

    ngOnInit(){
        this.todos = this.todoService.getTodos();
        this.todoService.todoListChangeEvent.subscribe(
            (todos: Todo[]) => {
                this.todos = todos;
            }
        )
    }
    filterInputChange(event){
        this.todos = this.todoService.filterTodos(event.target.value.trim());
    }

    checkBoxSelected(){
        for (let todo of this.todos) {
            if(todo.status) return true;
        }
        return false;
    }
    deleteSelected(){
        this.todoService.deleteSelected();
    }
    showMessageForm() {
        this.todoService.switchTodoForm();
        
    } 
}