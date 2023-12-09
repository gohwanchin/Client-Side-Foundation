import { Component } from '@angular/core';
import { Contact } from './models';
import { ContactService } from './services/contact_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private contactSvc: ContactService){ }

  addContact(c: Contact){
    this.contactSvc.addContact(c)
      .then(result=>{
        console.log('Add contacts API: ', result);
        if (result.code == 201)
          alert(`${c.name} was successfully added`)
        else
          alert(`There was an error adding ${c.name}`)
        this.contactSvc.getContacts()
          .then(result => {
            console.log('Get contacts API: ', result);
            this.contactSvc.loadContacts.next(result)
          }).catch(err =>{
            console.error(`Error: ${JSON.stringify(err)}`);
          })
        }).catch(err => {
          console.error(`Error: ${JSON.stringify(err)}`);
        })
    this.openListTab()
    this.closeAddTab()
  }

  listContacts(){
    this.contactSvc.getContacts()
      .then(result => {
        console.log('Get contacts API: ', result);
        this.contactSvc.loadContacts.next(result)
      }).catch(err =>{
        console.error(`Error: ${JSON.stringify(err)}`);
      })
  }

  deleteContact(email: string){
    this.contactSvc.deleteContact(email)
      .then(result => {
        console.log(result);
        alert(`Deleted ${result.message} from contacts list`)
        this.contactSvc.getContacts()
          .then(result => {
            console.log('Get contacts API: ', result);
            this.contactSvc.loadContacts.next(result)
          }).catch(err =>{
            console.error(`Error: ${JSON.stringify(err)}`);
          })
      }).catch(err =>{
        console.error(`Error: ${JSON.stringify(err)}`);
      })
  }

  closeAddTab(){
    let tab = document.getElementById('add-tab-pane')
    tab?.classList.remove('active', 'show')
    let nav = document.getElementById('add-tab')
    nav?.classList.remove('active')    
  }

  closeListTab(){
    let tab = document.getElementById('list-tab-pane')
    tab?.classList.remove('active', 'show')
    let nav = document.getElementById('list-tab')
    nav?.classList.remove('active')    
  }

  openListTab(){
    let tab = document.getElementById('list-tab-pane')
    tab?.classList.add('active', 'show')
    let nav = document.getElementById('list-tab')
    nav?.classList.add('active')    
  }
}
