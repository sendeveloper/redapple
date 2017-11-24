import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-drug-effect',
  templateUrl: 'drug-effect.html',
})
export class DrugEffectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
  }
  
  ionViewDidLoad() {
 
  }
  showMenu() {
    this.menu.open();
  }

}
