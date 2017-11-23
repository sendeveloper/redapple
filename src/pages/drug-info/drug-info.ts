import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';
/**
 * Generated class for the DrugInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-drug-info',
  templateUrl: 'drug-info.html',
})
export class DrugInfoPage {

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
