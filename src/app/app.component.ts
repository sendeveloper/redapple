import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { Push, PushToken } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { TermsOfUsePage } from '../pages/terms-of-use/terms-of-use';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { AboutPage } from '../pages/about/about';

import { Rest } from '../providers/rest';

export interface PageInterface {
    title: string;
    description: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = 'TabsPage';
  appPages: PageInterface[] = [
        { title: 'Home', description: 'Home', component: HomePage, icon: 'home' },
        { title: 'Terms', description: 'Terms of Use', component: TermsOfUsePage, icon: 'md-contract' },
        { title: 'Policy', description: 'Privacy Policy', component: PrivacyPolicyPage, icon: 'eye-off' },
        { title: 'About', description: 'About page', component: AboutPage, icon: 'information-circle' }
    ];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
        public rest: Rest) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('mobileweb')) {
          this.rest.setDeviceNumber(1);
      }
      else
      {
          this.rest.setDeviceNumber(0);
      }
      // this.registerPush();
    });
  }
  // registerPush() {
  //     // Check that we are on a device
  //   if (this.platform.is('cordova')) {
  //       // Register push notifications with the push plugin
  //     this.push.register().then((t: PushToken) => {
  //       console.log('Generated Token' + JSON.stringify(t));
  //       // Save the user with Ionic's user auth service
  //       return this.push.saveToken(t);
  //     }).then( (t: PushToken) => {
  //       console.log('Token Saved', t);
  //       this.listenForPush();
  //     }).catch( (err) => {
  //       console.log('Error Saving Token: ' , err);
  //     });
  //    }
  // }
  openPage(page: PageInterface) {
    this.nav.setRoot(page.component).catch(() => {
    });
  }
}
