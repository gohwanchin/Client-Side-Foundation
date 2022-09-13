import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Order, Item } from 'src/app/models';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnChanges {

  @Input() order!: Order
  @Output() onSubmit = new Subject<Order>()

  form!: FormGroup
  arrCtrl!: FormArray
  numbers: number[] = new Array(10).fill(0).map((x,i)=>i+1)

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.form = this.createForm()
  }

  addItem() {
    this.arrCtrl.push(this.createItem())
  }

  removeItem(i: number){
    this.arrCtrl.removeAt(i)
  }

  processForm() {
    const order: Order = this.form.value as Order
    this.onSubmit.next(order)
    this.order = null!
    this.form = this.createForm()
    console.log(order);
  }

  private createForm(): FormGroup {
    this.arrCtrl = this.createItems(this.order?.items || [])
    this.arrCtrl.controls
    return this.fb.group({
      uuid: this.fb.control(this.order?.uuid || this.generateUUID().substring(0,8)),
      name: this.fb.control(this.order?.name || '', [Validators.required, Validators.minLength(3)]),
      mobile: this.fb.control(this.order?.mobile || '', [Validators.required]),
      items: this.arrCtrl
    })
  }

  private createItems(is: Item[] = []): FormArray{
    return this.fb.array(is.map(i => this.createItem(i)))
  }
  private createItem(i?: Item){
    return this.fb.group({
      item: this.fb.control(i?.item || '', [Validators.required, Validators.minLength(3)]),
      quantity: this.fb.control(i?.quantity || 1, [Validators.min(1), Validators.max(10)])
    })
  }

  private generateUUID(){
    return uuid()
  }
}
