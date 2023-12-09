import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form!: FormGroup

  @Output() addContact = new Subject<Contact>()
  @Output() onCancel = new Subject<void>()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  submit(){
    const contact = this.form.value as Contact
    console.log(contact);
    this.addContact.next(contact)
    this.form = this.createForm()
  }

  cancel(){
    this.onCancel.next()
  }

  private createForm(){
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      mobile: this.fb.control('', [Validators.required, Validators.max(99999999)])
    })
  }
}
