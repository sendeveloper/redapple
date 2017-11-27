import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rest } from '../../providers/rest';

import { ChatPharmacistPage } from '../chat-pharmacist/chat-pharmacist';
import { QuizPage } from '../quiz/quiz';
import { DrugInfoPage } from '../drug-info/drug-info';

@IonicPage()
@Component({
  selector: 'page-drug-resource',
  templateUrl: 'drug-resource.html',
})
export class DrugResourcePage {
  pages = {
    0: ChatPharmacistPage,
    1: QuizPage
  };
  info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
  }
  
  ionViewDidLoad() {
    this.getJsonData();
  }
  showMenu() {
    this.menu.open();
  }
  transit(i: number) {
    if (i>1)
      this.navCtrl.push(DrugInfoPage, {"index": (i+1)});
    else
      this.navCtrl.push(this.pages[i]);
  }
  getJsonData() {
    this.info = null
    this.http.get("assets/json/drug_resource.json").map(response => response.json()).subscribe(data => {
        this.info = data;
    });
  }
}
