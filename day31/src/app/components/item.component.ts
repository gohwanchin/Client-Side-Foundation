import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from '../model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  form!: FormGroup

  @Output() onSubmit = new Subject<Item>()

  numbers: number[] = new Array(10).fill(0).map((x,i)=>i+1)
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('',[Validators.required]),
      price: this.fb.control('', [Validators.required, Validators.min(1)]),
      quantity: this.fb.control('', [Validators.required])
    })
  }

  processForm(){
    const item:Item = this.form.value as Item
    this.onSubmit.next(item)
  }
}
