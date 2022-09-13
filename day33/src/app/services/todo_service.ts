import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject, tap } from "rxjs";
import { Todo } from "../models";

@Injectable()
export class TodoService{
    // Doesn't need @Output() because it's not a UI
    onNewData = new Subject<Todo[]>()

    constructor(private http: HttpClient){}

    getTodo(uid: number): Promise<Todo[]>{
        let params = new HttpParams().set('userId', uid)
        return firstValueFrom(
            this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos',{params})
            .pipe(
                tap(data => {
                    this.onNewData.next(data)
                })
            )
        )
        /* .then(data => {
            this.onNewData.next(data)
            return data
        }) */
    }
}