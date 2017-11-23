import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';
@IonicPage()
@Component({
  selector: 'page-drug-resource',
  templateUrl: 'drug-resource.html',
})
export class DrugResourcePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  }
  
  ionViewDidLoad() {
    
  }
  showMenu() {
    this.menu.open();
  }
  transit(i: number) {
  	console.log(i);
  }
}
