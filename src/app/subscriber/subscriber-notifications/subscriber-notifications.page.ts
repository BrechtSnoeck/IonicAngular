import { Component, OnInit } from '@angular/core';
import { Stomp } from 'src/stomp.js';

import { Melding } from './melding.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriberService } from '../subscriber.service';
import { Subscriber } from '../subscriber.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-subscriber-notifications',
  templateUrl: './subscriber-notifications.page.html',
  styleUrls: ['./subscriber-notifications.page.scss'],
})
export class SubscriberNotificationsPage implements OnInit {
  subscriber: Subscriber;
  meldingen: Melding[] = [
    {
      command: 'MESSAGE',
      body: 'test'
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private alertControl: AlertController,
    private router: Router) {

    const ws = new WebSocket('ws://10.0.2.2:15674/ws');
    const client = Stomp.over(ws);

    const self = this;

    const onConnect = () => {
      console.log('connected');
      client.subscribe('/queue/hello', (message) => {
        console.log(message);
        self.meldingen.push(message);
        // console.log(self.meldingen);
      });
    };
    const onError = () => {
      console.log('error');
    };

    client.connect('guest', 'guest', onConnect, onError, '/');

  }

  confirmMelding() {
    this.alertControl.create({
      header: 'Melding',
      message: 'Wil je deze melding bevestigen?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Confirm',
        handler: () => {
          this.router.navigate(['/subscriber']);
        }
      }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('subscriberId')) {
        // redirect
        this.router.navigate(['/subscriber']);
        return;
      }
      const subscriberId = paramMap.get('subscriberId');
      this.subscriber = this.subscriberService.getSubscriber(subscriberId);
    });
  }

}
