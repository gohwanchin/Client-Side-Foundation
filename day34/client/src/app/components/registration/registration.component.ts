import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Registration } from 'src/app/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup

  @Output() onRegister = new Subject<Registration>()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  processForm(){
    const reg: Registration = this.form.value as Registration
    this.onRegister.next(reg) 
    this.form = this.createForm()
  }

  private createForm(){
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required)
    })
  }

}
