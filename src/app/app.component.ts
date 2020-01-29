import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Network } from '@ionic-native/network/ngx';
import { NetworkProvider } from '../app/network-provider';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public events: Events,
    public network: Network,
    public networkProvider: NetworkProvider,
    private localNotifications: LocalNotifications,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.networkProvider.initializeNetworkEvents();

	       		// Offline event
			    this.events.subscribe('network:offline', () => {
              this.localNotifications.schedule({
                id: 1,
                title: 'Netwerk',
                text: 'Je bent de verbinding verlorer met het netwerk!',
                data: { secret: 'secret' }
              });
              //alert('network:offline ==> '+this.network.type);    
              console.log("Geen WIFI");  
			    });

			    // Online event
			    this.events.subscribe('network:online', () => {
              this.localNotifications.schedule({
                id: 1,
                title: 'Netwerk',
                text: 'Je bent nu verbonden met ' + this.network.type + '!',
                data: { secret: 'secret' }
              }); 
              //alert('network:online ==> '+this.network.type); 
              console.log("Wel WIFI");   
          }); 
          
    });
  }
}
