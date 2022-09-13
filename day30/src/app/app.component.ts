import { Component } from '@angular/core';
import { Registration } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arr: number[] = []
  arrString = ""
  num = this.getRandomInt(31)

  getRandomInt(max: number){
    return Math.floor(Math.random() * max)
  }

  imageClicked(n: number) {
    this.arr.push(n)
    this.arrString = this.arr.join(", ")
  }

  carson: Registration = {
    name: 'Carson',
    email: 'carson@gmail.com',
    gender: 'f',
    newsletter: true
  }
  newRegistration(reg: Registration){
    console.log(reg);
  }
}
