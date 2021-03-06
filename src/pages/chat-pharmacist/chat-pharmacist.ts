import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-chat-pharmacist',
  templateUrl: 'chat-pharmacist.html',
})
export class ChatPharmacistPage {
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  ionViewWillEnter() {
    if (this.rest.isShowTab())
      this.tabBarElement.style.display = 'flex';
  }
  ionViewWillLeave() {
    
  }
  ionViewDidLoad() {
    
  }
  
  showMenu() {
    this.menu.open();
  }

}
