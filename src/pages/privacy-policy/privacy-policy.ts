import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  }

  ionViewDidLoad() {

  }
  showMenu() {
    this.menu.open();
  }

}
