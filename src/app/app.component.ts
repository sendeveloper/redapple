import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TermsOfUsePage } from '../pages/terms-of-use/terms-of-use';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AboutPage } from '../pages/about/about';

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
        { title: 'Feedback', description: 'Feed back', component: FeedbackPage, icon: 'star' },
        { title: 'About', description: 'About page', component: AboutPage, icon: 'information-circle' }
    ];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page: PageInterface) {
    this.nav.setRoot(page.component).catch(() => {
        // console.log("Didn't set nav root");
    });
  }
}
