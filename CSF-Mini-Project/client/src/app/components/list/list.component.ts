import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contact } from 'src/app/models';
import { ContactService } from 'src/app/services/contact_service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  sub$!: Subscription
  contacts: Contact[] = []

  @Output() onDelete = new Subject<string>()

  constructor(private contactSvc: ContactService) { }

  ngOnInit(): void {
    this.sub$ = this.contactSvc.loadContacts.subscribe(
      list => {
        console.log(list);
        this.contacts = list
      }
    )
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe()
  }

  delete(email: string){
    console.log(email);    
    this.onDelete.next(email)
  }
}
