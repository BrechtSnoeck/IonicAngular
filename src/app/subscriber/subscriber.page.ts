import { Component, OnInit } from '@angular/core';
import { Subscriber } from './subscriber.model';
import { SubscriberService } from './subscriber.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.page.html',
  styleUrls: ['./subscriber.page.scss'],
})
export class SubscriberPage implements OnInit {
  subscribers: Subscriber[];

  constructor(private subscriberService: SubscriberService, private router: Router) {
    this.subscriberService.checkLogin();
    this.subscriberService.isLoggedin.subscribe(e => {
      console.log(e);
      if (e !== '') {
        this.router.navigate(['./subscriber', e]);
      }
    });
   }

  ngOnInit() {
    this.subscribers = this.subscriberService.getAllSubscribers();
  }

  setStorage(type: string) {
    localStorage.setItem('id', type);
  }
}
