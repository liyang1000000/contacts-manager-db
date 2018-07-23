import { Component, OnInit } from '@angular/core'
import { IContact, Contact } from './../contact'
import { ActivatedRoute, Router } from '@angular/router'
import { ContactsService } from './../contacts.service'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { NotificationsService} from './../../shared/notifications/notifications.service'

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent implements OnInit {
	formType: string
	contact: IContact
	contactForm = this.fb.group({
  		id: [{value: null, disabled: true}],
  		fName: ['', Validators.required],
  		lName: ['', Validators.required],
  		email: ['', [Validators.required, Validators.email]],
  		phone: [''],
  		status: ['active', Validators.required],
  	})

  constructor(private notificationsService: NotificationsService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private contactsService: ContactsService) { 
  }

  ngOnInit() {
    this.notificationsService.clearAllNotifications()
  	const contactId = this.route.snapshot.paramMap.get('id')
  	this.formType = contactId !== 'new' ? 'edit' : 'new'
  	if (contactId === 'new') {
  		this.contact = new Contact()
  	} else {
  		this.contactsService.getContactById(contactId).subscribe((res) => {
  			let contact = res
        this.contact = contact
  			this.contactForm.setValue({
  				id: contact.id,
  				fName: contact.fName,
  				lName: contact.lName,
  				email: contact.email,
  				phone: contact.phone,
  				status: contact.status
  			})
  		})
  	}
  }

  isFieldValid(field: string) {
    return !this.contactForm.get(field).valid && this.contactForm.get(field).touched
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    }
  }

  private validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field)
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true})
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }

  onSubmit(form) {
    if (form.valid) {
      const id = form.getRawValue().id
      if (!id) {
        this.contactsService.createContact(form.value).subscribe((res) => {
          this.router.navigate(['/contacts'])
          this.notificationsService.clearAllNotifications()
          this.notificationsService.pushNotifications({
            id: 'CREATE_INFO',
            content: `Contact ${res.id} - ${form.value.fName} ${form.value.lName} has been successfully created.`
          })
        })
      } else {
        this.contactsService.updateContact(form.value, id).subscribe(() => {
          this.router.navigate(['/contacts'])
          this.notificationsService.clearAllNotifications()
          this.notificationsService.pushNotifications({
            id: 'UPDATE_INFO',
            content: `Contact ${id} - ${form.value.fName} ${form.value.lName} has been successfully updated.`
          })
        })
      }
    } else {
      this.validateAllFormFields(form)
    }
  	
  }

}
