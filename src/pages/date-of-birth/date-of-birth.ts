import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { PrescriptionListPage } from '../prescription-list/prescription-list';

@IonicPage()
@Component({
  selector: 'page-date-of-birth',
  templateUrl: 'date-of-birth.html',
})
export class DateOfBirthPage {
	scode: string;
	birthday: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  	this.scode = this.navParams.get('code');
  }

  ionViewDidLoad() {
  	this.birthday = '';
    // console.log('ionViewDidLoad DateOfBirthPage');
  }

  showMenu() {
    this.menu.open();
  }
  getList() { 	
  	this.navCtrl.push(PrescriptionListPage, {'code': this.scode, 'birthday': this.birthday});
  }
}
