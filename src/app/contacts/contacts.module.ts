import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ContactsListComponent } from './contacts-list/contacts-list.component'
import { ContactsFormComponent } from './contacts-form/contacts-form.component'
import { ContactsRoutingModule } from './contacts-routing.module'
import { ContactsService } from './contacts.service'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './../shared/shared.module'

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ContactsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
  	ContactsFormComponent,
  	ContactsListComponent
  ],
  exports: [
  	ContactsFormComponent,
  	ContactsListComponent
  ],
  providers: [
  	ContactsService
  ]
})
export class ContactsModule { }
