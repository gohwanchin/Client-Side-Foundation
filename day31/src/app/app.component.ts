import { Component } from '@angular/core';
import { Item } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day31';

  cart: Item[] = []
  
  newItem(i:Item){
    this.cart = [...this.cart, i]
    console.log(this.cart);
    
  }

  removeItem(i:number){
    console.log(this.cart);
    let tmp = [...this.cart]
    tmp.splice(i, 1)
    this.cart = tmp
  }
}
