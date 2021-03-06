import { Component, OnInit } from '@angular/core';
import { Stomp } from 'src/stomp.js';

import { ActivatedRoute, Router } from '@angular/router';
import { SubscriberService } from '../subscriber.service';
import { Subscriber } from '../subscriber.model';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-subscriber-notifications',
  templateUrl: './subscriber-notifications.page.html',
  styleUrls: ['./subscriber-notifications.page.scss'],
})
export class SubscriberNotificationsPage implements OnInit {
  subscriber: Subscriber;
  connectivity: boolean;
  meldingen: any[] = [];
  boodschappen: string[] = [];
  client: any;

  constructor(
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private alertControl: AlertController,
    private router: Router) {

    const autoConnect = () => {
      const ws = new WebSocket('ws://81.82.52.102:15674/ws');
      this.client = Stomp.over(ws);
      this.client.heartbeat.outgoing = 0;
      this.client.heartbeat.incoming = 0;
      this.client.reconnect_delay = 5000;

      const self = this;

      const onConnect = () => {
        console.log('connected');
        self.connectivity = true;
        const queue: string = '/queue/' + self.subscriber.id;
        this.client.subscribe(queue, (message) => {
          const content = message.body.split(';');
          const boodschap: string = content[1] + ' ontving waarde: ' +  content[0];
          console.log(message);
          this.localNotifications.schedule({
            id: 1,
            title: 'Servicebus',
            text: 'Je hebt een melding ontvangen:' + boodschap
          });
          self.boodschappen.push(boodschap);
          self.meldingen.push(message);
        }, {ack: 'client-individual'});
      };

      const onError = () => {
        console.log('error');
        self.meldingen.splice(0, self.meldingen.length);
        self.boodschappen.splice(0, self.boodschappen.length);
        self.connectivity = false;
        self.client.disconnect();
        autoConnect();
      };

      this.client.connect('team2', 'team2', onConnect, onError, 'team2vhost');
    };

    autoConnect();

    }

    ionViewDidLeave() {
      // console.log('ist weg?');
      localStorage.removeItem('id');
      this.client.disconnect();
    }

  confirmMelding(index: number) {
          // console.log(this.meldingen[index].headers['message-id']);
          this.meldingen[index].ack();
          this.meldingen.splice(index, 1);
          this.boodschappen.splice(index, 1);
          // console.log(index);
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
