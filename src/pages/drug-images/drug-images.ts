import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';
@IonicPage()
@Component({
  selector: 'page-drug-images',
  templateUrl: 'drug-images.html',
})
export class DrugImagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  }
  
  ionViewDidLoad() {
    // console.log('ionViewDidLoad DrugImagesPage');
  }
  showMenu() {
    this.menu.open();
  }
}
