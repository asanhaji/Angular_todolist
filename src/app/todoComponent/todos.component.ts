import { TodoService } from './services/todo.service';
import { Todo } from './model/todo.model';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'app-todos',
    templateUrl: './views/todos.component.html',
    styleUrls: ['./views/todos.component.css']
})
export class TodosComponent implements OnInit {
    todo: Todo;
    todos: Todo[];
    todoName: String;
    todoDescription: String;

    myForm: FormGroup;
    showForm: boolean = true;

    constructor(private todoService: TodoService) { }


    onSubmit() {
        if (this.todo) {//todo préchargé, on est en mode édition
            this.todo.name = this.myForm.value.name;
            this.todo.description = this.myForm.value.description;
            this.todo.edited_at = new Date();
            this.todoService.updateTodo(this.todo);
            this.todo = null;
        } else {//aucun todo défini, on appelle methode addtodo
            const todo = new Todo(this.myForm.value.name, this.myForm.value.description);
            this.todoService.addTodo(todo);
        }
        this.showForm = true;
        $('.todo-input').slideUp("slow");
        this.myForm.reset();
    }

    editValid(){
        if(!this.todo){
            return true;
        }else{
            if(this.todo.name != this.myForm.value.name.trim() || this.todo.description != this.myForm.value.description.trim()){
                return true;
            }else{
                return false;
            }
        }
    }

    onCancel() {
        $('.todo-input').slideUp("slow");
        this.todo = null;
        this.showForm = true;
        this.myForm.reset();
    }

    ngOnInit() {
        $('.todo-input').slideToggle(0);
        this.todoService.todoEditEvent.subscribe(
            (todo: Todo) => {
                if(this.showForm) {
                    $('.todo-input').slideDown("slow");
                    this.showForm = !this.showForm;
                }
                this.todo = todo;
            }
        );
        this.todoService.switchTodoFormEvent.subscribe(
            (evt: string) => {
                if(this.showForm) {
                    $('.todo-input').slideDown("slow");
                }else {
                    this.myForm.reset();
                    this.todo = null;
                    $('.todo-input').slideUp("slow");
                }
                this.showForm = !this.showForm;
            }
        );
        this.myForm = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(140)
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(140)
            ]),
        });
    }
}