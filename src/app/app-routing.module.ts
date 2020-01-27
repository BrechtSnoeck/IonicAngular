import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'subscriber', pathMatch: 'full' },
  {
    path: 'subscriber',
    children: [
      {
        path: '',
        loadChildren: () => import('./subscriber/subscriber.module').then( m => m.SubscriberPageModule)
      },
      {
        path: ':subscriberId',
        loadChildren: () => import('./subscriber/subscriber-notifications/subscriber-notifications.module').then( m => m.SubscriberNotificationsPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
