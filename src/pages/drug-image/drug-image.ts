import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rest } from '../../providers/rest';
@IonicPage()
@Component({
  selector: 'page-drug-image',
  templateUrl: 'drug-image.html',
})
export class DrugImagePage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public menu: MenuController, public rest: Rest,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
    this.data = null;
    rest.getDrugImage(this);
  }
  
  ionViewDidLoad() {
    
  }
  showMenu() {
    this.menu.open();
  }
  setData(d){
    this.data = d;
    console.log(this.data);
  }
}
