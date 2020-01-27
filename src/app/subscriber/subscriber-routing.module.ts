import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberPage } from './subscriber.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberPage
  },
  {
    path: 'subscriber-notifications',
    loadChildren: () => import('./subscriber-notifications/subscriber-notifications.module').then( m => m.SubscriberNotificationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberPageRoutingModule {}
