import { Component } from '@angular/core';
import { Registration } from './models';
import { RegistrationService } from './services/registration_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private regSvc: RegistrationService){}

  processRegistration(reg: Registration){
    console.log(reg);
    this.regSvc.newRegistration(reg)
      .then(result => {
        console.log("Result: ", result);
        alert(`Your registration id is ${result.message}`)
      }).catch(error =>{
        console.error("Error: ", error);
        alert(`Error: ${JSON.stringify(error)}`)
      })
  }
}
