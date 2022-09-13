import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './services/todo_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private todoSvc: TodoService) { }

  getData() {
/*     let params = new HttpParams().set("userId", 4).set("id", 61)
    // take the last value from the observable and
    // return the result in a promise
    lastValueFrom(
      // reutrns an observable
      this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {params})
        .pipe()
    ).then(data => data.slice(0,10))
    .then(this.processTodo)
    .catch((error: HttpErrorResponse) => {
      // error handling
      console.error(error.message);
    }) */
    this.todoSvc.getTodo(4)
    .then(data => data.slice(0,10))
    .then(this.processTodo)
    .catch((error: HttpErrorResponse) => {
      // error handling
      console.error(error.message);
    })
  }

  take10(todo:Todo[]){
    return todo.slice(0,10)
  }

  processTodo(todo: Todo[]){
    console.log(todo);
  }
}
