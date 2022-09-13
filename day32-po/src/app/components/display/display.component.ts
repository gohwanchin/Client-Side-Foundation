import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDB, ordersDB } from 'src/app/models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input()
  set version(n: number){
    this.orderIds = []
    for (let k in ordersDB)
      this.orderIds.push(k)
  }

  @Output() onEdit = new Subject<string>()

  orders = ordersDB
  orderIds: string[] = []
  constructor() { }

  ngOnInit(): void {
  }

  editOrder(uuid: string){
    this.onEdit.next(uuid)
  }

}
