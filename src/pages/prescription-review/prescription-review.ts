import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { DrugInfoPage } from '../drug-info/drug-info';
import { DrugImagePage } from '../drug-image/drug-image';
import { DrugEffectPage } from '../drug-effect/drug-effect';
import { DrugResourcePage } from '../drug-resource/drug-resource';

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

  }
  showMenu() {
    this.menu.open();
  }
  drugInfo(i: number) {
  	this.navCtrl.push(DrugInfoPage, {"index": i});
  }
  drugImage() {
  	this.navCtrl.push(DrugImagePage);
  }
  drugEffect() {
    this.navCtrl.push(DrugEffectPage);
  }
  drugResource() {
  	this.navCtrl.push(DrugResourcePage);
  }
}
