import { Component, OnInit } from '@angular/core';
import { Subscriber } from './subscriber.model';
import { SubscriberService } from './subscriber.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.page.html',
  styleUrls: ['./subscriber.page.scss'],
})
export class SubscriberPage implements OnInit {
  subscribers: Subscriber[];

  constructor(private subscriberService: SubscriberService) { }

  ngOnInit() {
    this.subscribers = this.subscriberService.getAllSubscribers();
  }

}
