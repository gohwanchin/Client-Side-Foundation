import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  @Input()
  set num(n: number){
    this._num = n
    this.image = `/assets/numbers/number${this._num}.jpg`
  }

  get num(){
    return this._num
  }

  private _num !: number
  image !: string
  prevDisabled !: boolean
  nextDisabled !: boolean

  @Output()
  onImageClick = new Subject<number>()

  constructor() { }

  ngOnInit(): void {
    this.image = `/assets/numbers/number${this._num}.jpg`
    this.checkDisabled()
  }

  next(){
    this._num++
    this._num %= 31
    this.image = `/assets/numbers/number${this._num}.jpg`
    this.checkDisabled()
  }

  prev(){
    this._num--
    if(this._num < 0){
      this._num = 30
    }
    this._num %= 31
    this.image = `/assets/numbers/number${this._num}.jpg`
    this.checkDisabled()
  }
  
  imageClick(){
    this.onImageClick.next(this._num)
  }

  checkDisabled(){
    if (this.num == 0){
      this.prevDisabled = true
      this.nextDisabled = false
    } else if(this.num == 30){
      this.prevDisabled = false
      this.nextDisabled = true
    } else{
      this.prevDisabled = false
      this.nextDisabled = false
    }
  }
}
