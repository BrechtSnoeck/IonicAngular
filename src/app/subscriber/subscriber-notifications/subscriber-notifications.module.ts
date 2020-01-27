import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberNotificationsPageRoutingModule } from './subscriber-notifications-routing.module';

import { SubscriberNotificationsPage } from './subscriber-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriberNotificationsPageRoutingModule
  ],
  declarations: [SubscriberNotificationsPage]
})
export class SubscriberNotificationsPageModule {}
