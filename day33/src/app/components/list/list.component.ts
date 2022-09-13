import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models';
import { TodoService } from 'src/app/services/todo_service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  //end Subscription variables with $
  sub$!: Subscription

  todos: Todo[] =[ ]

  constructor(private todoSvc: TodoService) { }

  ngOnInit(): void {
    this.sub$ = this.todoSvc.onNewData.subscribe(data =>{
      this.todos = data
    })
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }

  processData(data: Todo[]){
    this.todos = data
  }

}
