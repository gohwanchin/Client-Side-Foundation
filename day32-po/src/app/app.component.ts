import { Component } from '@angular/core';
import { Order, ordersDB } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  order!: Order
  version: number = 0

  // order:Order = {
  //   uuid: 'test',
  //   name: 'test',
  //   mobile: 666,
  //   items: []
  // }

  updateOrder(uuid: string){
    console.log('Update order');
    this.order = ordersDB[uuid]
  }
  
  addOrder(order:Order){
    ordersDB[order.uuid] = order
    console.log(ordersDB);
    this.version++
  }
}
