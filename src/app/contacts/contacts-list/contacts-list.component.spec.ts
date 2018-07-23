import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TemplateRef } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ContactsListComponent } from './contacts-list.component'
import { SharedModule } from './../../shared/shared.module'
import { BsModalService } from 'ngx-bootstrap/modal'
import { NotificationsService } from './../../shared/notifications/notifications.service'
import { ContactsService} from './../contacts.service'
import { Observable, of } from 'rxjs'
import { RouterTestingModule } from '@angular/router/testing'
import { Contact, IContact} from './../contact'

let contactsService: ContactsService
let notificationsService: NotificationsService
let bsModalService: BsModalService

class MockContactService {
  getContacts() {
    return of([{ id: '123', fName:'Yang', lName: 'Li', email: 'yangli@gmail.com', phone: '3528714670', status:'inactive'}])
  }

  deleteContact(contact) {
    return of({id: '123', fName:'Yang', lName: 'Li', email: 'yangli@gmail.com', phone: '3528714670', status:'active'})
  }

  inactivateContact(contact) {
    return of({id: '123', fName:'Yang', lName: 'Li', email: 'yangli@gmail.com', phone: '3528714670', status:'inactive'})
  }
}

describe('ContactsListComponent', () => {
  let component: ContactsListComponent
  let fixture: ComponentFixture<ContactsListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsListComponent ],
      imports: [SharedModule, FormsModule, RouterTestingModule],
      providers: [BsModalService, NotificationsService, {provide: ContactsService, useClass:MockContactService}]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListComponent)
    component = fixture.componentInstance
    bsModalService = TestBed.get(BsModalService)
    notificationsService = TestBed.get(NotificationsService)
    spyOn(bsModalService, 'show')
    spyOn(notificationsService, 'clearAllNotifications')
    spyOn(notificationsService, 'pushNotifications')
  })

  it('should init component correctly', () => {
    component.ngOnInit()
    expect(component.contacts.length).toBe(1)
  })

  it('should open modal correctly', () => {
    const template = null
    component.openModal(template)
    expect(bsModalService.show).toHaveBeenCalled()
  })

  it('should confirm correctly', () => {
    spyOn(component, 'deleteContact')
    const template = null
    component.openModal(template)
    component.modalRef = {
      hide: function() {}
    }
    spyOn(component.modalRef, 'hide')
    component.confirm()
    expect(component.deleteContact).toHaveBeenCalled()
    expect(component.modalRef.hide).toHaveBeenCalled()
  })

  it('should decline correctly', () => {
    const template = null
    component.openModal(template)
    component.modalRef = {
      hide: function() {}
    }
    spyOn(component.modalRef, 'hide')
    component.decline()
    expect(component.targetContact).toEqual(new Contact())
    expect(component.modalRef.hide).toHaveBeenCalled()
  })

  it('should delete contact correctly', () => {
    component.ngOnInit()
    component.deleteContact({id: '123', fName:'Yang', lName: 'Li', email: 'yangli@gmail.com', phone: '3528714670', status:'inactive'})
    expect(component.contacts.length).toBe(0)
    expect(notificationsService.clearAllNotifications).toHaveBeenCalled()
    expect(notificationsService.pushNotifications).toHaveBeenCalled()
  })

  it('should inactivate contact correctly', () => {
    component.ngOnInit()
    component.inactivateContact(component.contacts[0])
    expect(component.contacts[0].status).toBe('inactive')
    expect(notificationsService.clearAllNotifications).toHaveBeenCalled()
    expect(notificationsService.pushNotifications).toHaveBeenCalled()
  })

  it('should get start row correctly', () => {
    component.ngOnInit()
    expect(component.getStartRow()).toBe(1)
  })

  it('should get end row correctly', () => {
    component.ngOnInit()
    expect(component.getEndRow()).toBe(1)
  })
  
})
