import { Component, OnInit, Input } from '@angular/core';
import { Notification } from './notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notification : Notification

  constructor() {}

  ngOnInit() {
  }

  cleanError() {
    this.notification.cleanError()
  }

}
