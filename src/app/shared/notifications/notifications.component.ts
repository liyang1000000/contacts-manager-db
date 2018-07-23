import { Component, OnInit } from '@angular/core'
import { NotificationsService } from './notifications.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications = []

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  getNotifications() {
  	return this.notificationsService.getNotifications()
  }

}
