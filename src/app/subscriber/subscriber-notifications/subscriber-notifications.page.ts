import { Component, OnInit } from '@angular/core';
import { Stomp } from 'src/stomp.js';

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
  meldingen: any[] = [];

  constructor(

    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private alertControl: AlertController,
    private router: Router) {

    const autoConnect = () => {

      const ws = new WebSocket('ws://192.168.1.2:15674/ws');
      const client = Stomp.over(ws);
      client.heartbeat.outgoing = 0;
      client.heartbeat.incoming = 0;
      client.reconnect_delay = 5000;

      const self = this;

      const onConnect = () => {
        console.log('connected');
        client.subscribe('/queue/hello', (message) => {
          self.meldingen.push(message);
          console.log(self.meldingen);
        }, {ack: 'client-individual'});
      };

      const onError = () => {
        console.log('error');
        self.meldingen.splice(0, self.meldingen.length);
        autoConnect();
      };

      client.connect('team2', 'team2', onConnect, onError, 'team2vhost');
    };

    autoConnect();

    }

  confirmMelding(index: number) {
    this.alertControl.create({
      header: 'Melding',
      message: 'Wil je deze melding bevestigen?',
      buttons: [{
        text: 'Annuleren',
        role: 'cancel'
      },
      {
        text: 'Bevestig',
        handler: () => {
          console.log(this.meldingen[index].headers['message-id']);
          this.meldingen[index].ack();
          this.meldingen.splice(index, 1);
          console.log(index);
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
