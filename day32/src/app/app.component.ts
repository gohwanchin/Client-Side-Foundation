import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TodoComponent } from './components/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  
  @ViewChild(TodoComponent)
  todoComp!: TodoComponent

  @ViewChildren(TodoComponent)
  todoComps!: QueryList<TodoComponent>

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
      
  }

  saveTodo(){
    const todo = this.todoComp.getValues()
    console.log(todo);
  }
}
