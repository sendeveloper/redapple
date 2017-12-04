import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { EnterCodePage } from '../enter-code/enter-code';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tabBarElement: any;
  constructor(public navCtrl: NavController, public menu: MenuController, public rest: Rest) {
    this.menu = menu;
    this.tabBarElement = null;
  }
  ionViewWillEnter() {
    var self = this;
    setTimeout(function() {
      self.tabBarElement = document.querySelector('.tabbar.show-tabbar');
      if (self.tabBarElement)
      {
        if (self.rest.isShowTab())
          self.tabBarElement.style.display = 'flex';
      }
    }, 400);
  }
  ionViewWillLeave() {
  }
  showMenu() {
    this.menu.open();
  }
  goNext() {
    this.navCtrl.push(EnterCodePage);
  }
}
