import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
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
    index: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage:any = 'TabsPage';
  appPages: PageInterface[] = [
        { title: 'Home', description: 'Home', component: TabsPage, icon: 'home', index: 0 },
        { title: 'Terms', description: 'Terms of Use', component: TermsOfUsePage, icon: 'md-contract', index: -1 },
        { title: 'Policy', description: 'Privacy Policy', component: PrivacyPolicyPage, icon: 'eye-off', index: -1 },
        { title: 'About', description: 'About page', component: AboutPage, icon: 'information-circle', index: -1 }
    ];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
        public events: Events, public rest: Rest) {
    var self = this;
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
    });

    events.subscribe('menu:changed', (label) => {
      self.appPages[0]['description'] = label;
      self.appPages[0]['title'] = label;
    });
  }
  openPage(page: PageInterface) {
    let params = {};
    // console.log(page.index);
    if (page.index) {
      params = { tabIndex: page.index };
    }
    // console.log(this.nav.getActiveChildNavs());
    if (this.nav.getActiveChildNavs().length && page.index != -1) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.component, params);
    }

    // this.nav.setRoot(page.component).catch(() => {
    // });
  }
}
