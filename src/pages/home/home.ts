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
  ionViewDidLoad() {
    if (this.tabIndex == 0)
    {
      var self = this;
      setTimeout(function() {
        self.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        if (self.rest.isShowTab() && self.tabBarElement)
          self.tabBarElement.style.display = 'flex';
      }, 300);
    }
  }
  ionViewWillLeave() {
    if (this.tabBarElement)
      this.tabBarElement.style.display = 'flex';
  }
  showMenu() {
    this.menu.open();
  }
  goNext() {
    this.navCtrl.push(EnterCodePage);
  }
}
