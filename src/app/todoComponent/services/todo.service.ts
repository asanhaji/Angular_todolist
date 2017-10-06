import { Todo } from './../model/todo.model';
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class TodoService {

    private todos: Todo[];

    switchTodoFormEvent = new EventEmitter<string>();
    todoEditEvent = new EventEmitter<Todo>();
    todoListChangeEvent = new EventEmitter<Todo[]>();

    constructor() { }

    addTodo(todo: Todo) {
        this.todos.push(todo);
        this.todos.sort(this.dateSortFilter);
        this.todos.sort(this.statusFilter);
        this.todos.sort(this.dateSortTrueStatusFilter);
        this.todoListChangeEvent.emit(this.todos);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    getTodos() {
        if (!this.todos) {
            this.todos = JSON.parse(localStorage.getItem("todos"));
            if (this.todos) {
                this.todos.sort(this.dateSortFilter);
                this.todos.sort(this.statusFilter);
                this.todos.sort(this.dateSortTrueStatusFilter);
            }else{
                this.todos = new Array();
            }
        }
        return this.todos;
    }

    updateTodo(todo: Todo) {
        this.todos[this.todos.indexOf(todo)] = todo;
        if (this.todos.length) {
            this.todos.sort(this.dateSortFilter);
            this.todos.sort(this.statusFilter);
            this.todos.sort(this.dateSortTrueStatusFilter);
        }
        this.todoListChangeEvent.emit(this.todos);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    filterTodos(text: string) {
        if (!text) return this.todos;

        var filteredTodos = Object.assign([], this.todos).filter(
            todo => todo.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
        return filteredTodos;
    }
    switchTodoForm() {
        this.switchTodoFormEvent.emit("switch todo form");
    }

    editTodoClick(todo: Todo) {
        this.todoEditEvent.emit(todo);
    }

    deleteTodo(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.todoListChangeEvent.emit(this.todos);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    deleteSelected() {
        var newTodo: Todo[] = new Array();
        for (let todo of this.todos) {
            if (!todo.status) newTodo.push(todo);
        }
        this.todos = newTodo;
        this.todoListChangeEvent.emit(this.todos);
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    private statusFilter(todo) {
        if (!todo.status)
            return -1;
        else
            return 1;
    }
    private dateSortFilter(todo1: Todo, todo2: Todo) {
        if (todo1.edited_at && todo2.edited_at) return (new Date(todo2.edited_at).getTime() - new Date(todo1.edited_at).getTime());
        if (todo1.edited_at && !todo2.edited_at) return (new Date(todo2.created_at).getTime() - new Date(todo1.edited_at).getTime());
        if (!todo1.edited_at && todo2.edited_at) return (new Date(todo2.edited_at).getTime() - new Date(todo1.created_at).getTime());
        if (!todo1.edited_at && !todo2.edited_at) return (new Date(todo2.created_at).getTime() - new Date(todo1.created_at).getTime());
    }
    private dateSortTrueStatusFilter(todo1: Todo, todo2: Todo) {
        if (todo1.status && todo2.status && todo1.edited_at && todo2.edited_at) return (new Date(todo2.edited_at).getTime() - new Date(todo1.edited_at).getTime());
        if (todo1.status && todo2.status && todo1.edited_at && !todo2.edited_at) return (new Date(todo2.created_at).getTime() - new Date(todo1.edited_at).getTime());
        if (todo1.status && todo2.status && !todo1.edited_at && todo2.edited_at) return (new Date(todo2.edited_at).getTime() - new Date(todo1.created_at).getTime());
        if (todo1.status && todo2.status && !todo1.edited_at && !todo2.edited_at) return (new Date(todo2.created_at).getTime() - new Date(todo1.created_at).getTime());
    }
}