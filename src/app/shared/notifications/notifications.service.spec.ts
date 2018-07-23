import { TestBed, inject } from '@angular/core/testing'

import { NotificationsService } from './notifications.service'

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsService]
    })
  })

  it('should be created', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy()
  }))

  it('should push, get, clear notificationscorrectly', inject([NotificationsService], (service: NotificationsService) => {
  	service.pushNotifications({id: '123', content: 'TEST'})
  	expect(service.getNotifications().length).toBe(1)
  	service.clearAllNotifications()
  	expect(service.getNotifications().length).toBe(0)
  }))
})
