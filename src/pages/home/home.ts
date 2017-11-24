import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { EnterCodePage } from '../enter-code/enter-code';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController, public rest: Rest) {
    this.menu = menu;
  }

  ionViewDidLoad() {

  }
  showMenu() {
    this.menu.open();
  }
  goNext() {
    this.navCtrl.push(EnterCodePage);
  }
}
