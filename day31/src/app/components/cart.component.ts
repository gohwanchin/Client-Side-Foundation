import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input()
  set cart(c: Item[]){
    console.log('Setting cart', c);
    this._cart = c
    this.calculateTotal()
    console.log('Calculated');
  }

  get cart(){
    return this._cart
  }

  private _cart: Item[] = []

  @Output()
  onDelete = new Subject<number>()

  total = 0

  constructor() { }

  ngOnInit(): void {
    this.calculateTotal()
  }

  delete(i:number){
    this.onDelete.next(i)
  }

  calculateTotal(){
    console.log('Calculating total')
    let t = 0
    for (let item of this._cart){
      t += item.price * item.quantity
    }
    this.total = t
  }
}
