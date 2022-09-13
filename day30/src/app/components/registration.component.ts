import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Registration } from '../models'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Output() 
  onNewRegistration = new Subject<Registration>()

  @Input()
  registration!: Registration

  form!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(this.registration?.name, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(this.registration?.email, [Validators.required, Validators.email]),
      gender: this.fb.control(this.registration?.gender),
      newsletter: this.fb.control(false)
    })
  }

  processForm(){
    console.log('Form submitted!');
    const reg: Registration = this.form.value as Registration
    // const reg: Registration = {
    //   name: this.form.value.name,
    //   email: this.form.value.email,
    //   gender: this.form.value.gender,
    //   newsletter: this.form.value.newsletter
    // }
    this.onNewRegistration.next(reg)
  }
}
