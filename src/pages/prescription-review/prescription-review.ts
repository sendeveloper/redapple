import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { DrugImagesPage } from '../drug-images/drug-images';

@IonicPage()
@Component({
  selector: 'page-prescription-review',
  templateUrl: 'prescription-review.html',
})
export class PrescriptionReviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PrescriptionReviewPage');
  }
  showMenu() {
    this.menu.open();
  }
  drugItem() {
  	this.navCtrl.push(DrugImagesPage, {});
  }
}
