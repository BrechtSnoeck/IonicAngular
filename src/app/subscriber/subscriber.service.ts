import { Injectable } from '@angular/core';
import { Subscriber } from './subscriber.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  isLoggedin = new BehaviorSubject('');
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

  checkLogin() {
    if (localStorage.getItem('id')) {
      this.isLoggedin.next(localStorage.getItem('id'));
    }
  }

  getAllSubscribers() {
    return [...this.subscribers];
  }

  getSubscriber(subscriberId: string) {
    return {...this.subscribers.find(subscriber => {
      return subscriber.id === subscriberId;
    })};
  }
}
