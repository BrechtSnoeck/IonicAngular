import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberNotificationsPage } from './subscriber-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberNotificationsPageRoutingModule {}
