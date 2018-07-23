import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NotificationsComponent } from './notifications.component'
import { NotificationsService } from './notifications.service'

let notificationsService: NotificationsService

describe('NotificationsComponent', () => {
  let component: NotificationsComponent
  let fixture: ComponentFixture<NotificationsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      providers: [ NotificationsService ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent)
    component = fixture.componentInstance
    notificationsService = TestBed.get(NotificationsService)
    spyOn(notificationsService, 'getNotifications')
  })

  it('should get notifications correctly', () => {
    component.getNotifications()
    expect(notificationsService.getNotifications).toHaveBeenCalled()
  })
})
