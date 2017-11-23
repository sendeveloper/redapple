import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { HomePage } from '../home/home';
import { DateOfBirthPage } from '../date-of-birth/date-of-birth';

@IonicPage()
@Component({
  selector: 'page-enter-code',
  templateUrl: 'enter-code.html',
})
export class EnterCodePage {
  scode: string;
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public menu: MenuController, public rest: Rest) {
    this.menu = menu;
  }

  ionViewDidLoad() {
    this.scode = '';
  }
  showMenu() {
    this.menu.open();
  }
  goCancel() {
  	this.navCtrl.push(HomePage);
  }
  goContinue() {
  	this.navCtrl.push(DateOfBirthPage, {'code': this.scode});
  }
}
