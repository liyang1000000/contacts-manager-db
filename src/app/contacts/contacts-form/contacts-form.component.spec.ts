import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ContactsFormComponent } from './contacts-form.component'

import { SharedModule} from './../../shared/shared.module'
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { NotificationsService } from './../../shared/notifications/notifications.service'
import { ContactsService} from './../contacts.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, of} from 'rxjs'

class MockActivatedRoutes {
  snapshot = {
    paramMap: {
      get(id) {
        return '123'
      }
    }
  }
}

class MockRouter {
  navigate() {

  }
}

class MockContactService {
  getContactById(id) {
    return of({ id: '123', fName:'Yang', lName: 'Li', email: 'yangli@gmail.com', phone: '3528714670', status:'active'})
  }

  createContact(form) {
    return of({})
  }

  updateContact(form, id) {
    return of({})
  }
}

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent
  let fixture: ComponentFixture<ContactsFormComponent>
  let route: ActivatedRoute
  let router: Router
  let notificationsService: NotificationsService
  let contactsService: ContactsService
  let fb: FormBuilder
  let validators: Validators
  let formGroup: FormGroup
  let formControl: FormControl


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsFormComponent ],
      imports: [SharedModule, ReactiveFormsModule],
      providers: [{provide: ActivatedRoute, useClass: MockActivatedRoutes},
                    {provide: Router, useClass: MockRouter}, 
                    {provide: ContactsService, useClass: MockContactService},
                    NotificationsService]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsFormComponent)
    component = fixture.componentInstance
    contactsService = TestBed.get(ContactsService)
    notificationsService = TestBed.get(NotificationsService)
    router = TestBed.get(Router)
    spyOn(notificationsService, 'clearAllNotifications')
    spyOn(notificationsService, 'pushNotifications')
    spyOn(router, 'navigate')
  })

  it('should init component correctly', () => {
    component.ngOnInit()
    expect(notificationsService.clearAllNotifications).toHaveBeenCalled()
    expect(component.contact.id).toBe('123')
    expect(component.contactForm.value.fName).toBe('Yang')
  })

  it('should check a field valid correctly', ()=> {
    expect(component.isFieldValid('fName')).toBeFalsy()
  })

  it('should get correct error css', () => {
    expect(component.displayFieldCss('fName')['has-error']).toBeFalsy
    expect(component.displayFieldCss('fName')['has-feedback']).toBeFalsy
  })

  it('should submit correctly', () => {
    component.ngOnInit()
    component.onSubmit(component.contactForm)
    expect(router.navigate).toHaveBeenCalled()
    expect(notificationsService.clearAllNotifications).toHaveBeenCalled()
    expect(notificationsService.pushNotifications).toHaveBeenCalled()
  })

})
