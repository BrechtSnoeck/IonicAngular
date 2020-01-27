import { Injectable } from '@angular/core';
import { Subscriber } from './subscriber.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private subscribers: Subscriber[] = [
    {
      id: 'elek',
      name: 'Elektrician',
      icon: 'flash'
    },
    {
      id: 'mech',
      name: 'Mechanic',
      icon: 'build'
    }
  ];

  constructor() { }

  getAllSubscribers() {
    return [...this.subscribers];
  }

  getSubscriber(subscriberId: string) {
    return {...this.subscribers.find(subscriber => {
      return subscriber.id === subscriberId;
    })};
  }
}
