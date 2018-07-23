import { Component, OnInit, TemplateRef } from '@angular/core'
import { IContact, Contact } from './../contact'
import { ContactsService } from './../contacts.service'
import { NotificationsService} from './../../shared/notifications/notifications.service'
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts: IContact[]
  currentPage: number = 1
  modalRef: BsModalRef
  targetContact: IContact
  filteredItems = {
  	models: []
  }
  perPage: number = 10
  keyword: string = ''
  status: string = ''

  constructor( private modalService: BsModalService, private contactsService: ContactsService, private notificationsService: NotificationsService) { }

  ngOnInit() {
  	this.contactsService.getContacts().subscribe( res => {
  		this.contacts = res
  	}) 
  }

  openModal(template: TemplateRef<any>) {
  	this.modalRef = this.modalService.show(template, {class:'modal-lg'})
  }

  confirm() {
  	this.deleteContact(this.targetContact)
  	this.modalRef.hide()
  }

  decline() {
  	this.targetContact = new Contact()
  	this.modalRef.hide()
  }

  deleteContact(contact) {
  	this.contactsService.deleteContact(contact).subscribe((res) => {
  		let items = [].concat(this.contacts)
  		for (let i=0; i<items.length; i++) {
  			if (items[i].id === contact.id) {
  				items.splice(i, 1)
  				break
  			}
  		}
  		this.contacts = items
  		this.notificationsService.clearAllNotifications()
  		this.notificationsService.pushNotifications({
  			id: 'DELETE_INFO',
  			content: `Contact ${contact.id} - ${contact.fName} ${contact.lName} has been successfully deleted.`
  		})
  	})
  }

  inactivateContact(contact) {
  	this.contactsService.inactivateContact(contact).subscribe((res) => {
  		let items = [].concat(this.contacts)
  		for (let item of items) {
  			if (item.id === res.id) {
  				item = res
  				break
  			}
  		}
  		this.contacts = items
  		this.notificationsService.clearAllNotifications()
  		this.notificationsService.pushNotifications({
  			id: 'UPDATE_INFO',
  			content: `Contact ${contact.id} - ${contact.fName} ${contact.lName} has been inactivated.`
  		})
  	})
  }

  getStartRow() {
  	if (this.contacts) {
  		return (this.contacts.length > 0) ? (((this.currentPage - 1) * this.perPage) + 1) : 0
  	}	
  }

  getEndRow() {
  	if (this.contacts && this.contacts.length > 0) {
  		const endRow = (this.contacts.length < this.perPage) ? this.contacts.length : this.perPage
  		return endRow - 1 + this.getStartRow()
  	} else {
  		return 0
  	}
  }

}
