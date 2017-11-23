import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-drug-info',
  templateUrl: 'drug-info.html',
})
export class DrugInfoPage {
  ind: number;
  info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
  }
  
  ionViewDidLoad() {
    this.ind = this.navParams.get('index');
    this.getJsonData();  
  }
  showMenu() {
    this.menu.open();
  }
  getJsonData() {
    this.info = null
    this.http.get("assets/json/drug_info.json").map(response => response.json()).subscribe(data => {
        this.info = data;
    });
  }
}
