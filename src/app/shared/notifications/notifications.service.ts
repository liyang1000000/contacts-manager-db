import { Injectable } from '@angular/core'

@Injectable()
export class NotificationsService {
	private notifications = []
  
  constructor() { }

  pushNotifications(notification) {
  	this.notifications.push(notification)
  }

  getNotifications() {
  	return this.notifications
  }

  clearAllNotifications() {
  	this.notifications = []
  }
}
