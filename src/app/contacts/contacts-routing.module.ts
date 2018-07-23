import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { ContactsListComponent } from './contacts-list/contacts-list.component'
import { ContactsFormComponent } from './contacts-form/contacts-form.component'

const contactsRoute = [
  { path: 'contacts', component: ContactsListComponent },
  { path: 'contact/:id', component: ContactsFormComponent },
  { path: 'contact/new', component: ContactsFormComponent }
]

@NgModule({
  imports: [
  	RouterModule.forChild(contactsRoute),
  	FormsModule
  ],
  exports: [
  	RouterModule
  ]
})
export class ContactsRoutingModule { }
