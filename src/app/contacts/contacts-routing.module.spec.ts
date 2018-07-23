import { ContactsRoutingModule } from './contacts-routing.module'

describe('ContactsRoutingModule', () => {
  let contactsRoutingModule: ContactsRoutingModule

  beforeEach(() => {
    contactsRoutingModule = new ContactsRoutingModule()
  })

  it('should create an instance', () => {
    expect(contactsRoutingModule).toBeTruthy()
  })
})
