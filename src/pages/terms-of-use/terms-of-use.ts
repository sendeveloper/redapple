import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-terms-of-use',
  templateUrl: 'terms-of-use.html',
})
export class TermsOfUsePage {

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
