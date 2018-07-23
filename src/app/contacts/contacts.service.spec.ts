import { TestBed, inject } from '@angular/core/testing'
import { APP_BASE_HREF } from '@angular/common'
import { ContactsService } from './contacts.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClientModule } from '@angular/common/http'

let http: HttpTestingController
let service: ContactsService

describe('ContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ContactsService]
    })
    http = TestBed.get(HttpTestingController)
    service = TestBed.get(ContactsService)
  })

  it('should get contacts correctly', () => {
  	service.getContacts().subscribe(() => {})
  	http.expectOne({url: 'api/contacts', method: 'GET'})
  })

  it('should return 404 correctly', () => {
  	service.getContactNo404('123').subscribe(() => {})
  	http.expectOne({url: 'api/contacts/?id=123', method: 'GET'})
  })

  it('should get contact by id corretly', () => {
  	service.getContactById('123').subscribe(() => {})
  	http.expectOne({url: 'api/contacts/123', method: 'GET'})
  })

  it('should create item correctly', () => {
  	service.createContact({name: '123'}).subscribe(() => {})
  	const req = http.expectOne({url: 'api/contacts', method: 'POST'})
  	expect(req.request.body.name).toBe('123')
  })

  it('should update contact correctly', () => {
  	const data = {id: '123', name: '123'}
  	service.updateContact(data, '123').subscribe(() => {})
  	const req = http.expectOne({url: 'api/contacts/123', method: 'PUT'})
  	expect(req.request.body).toEqual(data)
  })

  it('should inactivate contact correctly', () => {
  	const data = {id: '123', name: '123', status: 'active'}
  	service.updateContact(data, '123').subscribe(() => {})
  	const req = http.expectOne({url: 'api/contacts/123', method: 'PUT'})
  	expect(req.request.body).toEqual(data)
  })

  it('should delete contact correctly', () => {
  	service.deleteContact('123').subscribe(() => {})
  	http.expectOne({url: 'api/contacts/123', method: 'DELETE'})
  })
})
