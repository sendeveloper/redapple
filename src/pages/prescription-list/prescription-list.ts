import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-prescription-list',
  templateUrl: 'prescription-list.html',
})
export class PrescriptionListPage {
	scode: string;
	birthday: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  	this.scode = this.navParams.get('code');
  	this.birthday = this.navParams.get('birthday');
  }

  ionViewDidLoad() {
    
  }
  
  showMenu() {
    this.menu.open();
  }
}
