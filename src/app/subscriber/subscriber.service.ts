import { Injectable } from '@angular/core';
import { Subscriber } from './subscriber.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private subscribers: Subscriber[] = [
    {
      id: 'elek',
      name: 'Elektricien',
      icon: 'flash'
    },
    {
      id: 'mech',
      name: 'Mechanieker',
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
