import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rest } from '../../providers/rest';

import { DrugInfoPage } from '../drug-info/drug-info';
import { DrugImagePage } from '../drug-image/drug-image';
import { DrugEffectPage } from '../drug-effect/drug-effect';
import { DrugResourcePage } from '../drug-resource/drug-resource';
import { QuizPage } from '../quiz/quiz';

@IonicPage()
@Component({
  selector: 'page-prescription-review',
  templateUrl: 'prescription-review.html',
})
export class PrescriptionReviewPage {
  info: any;
  generic_name: string;
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  				public menu: MenuController, public rest: Rest,
          public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.generic_name = this.navParams.get('generic_name');
  }
  ionViewWillEnter() {
    if (this.rest.isShowTab() == '')
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ionViewDidLoad() {
    this.getJsonData();
  }
  showMenu() {
    this.menu.open();
  }
  drugClick(i: number) {
    if (i == 1)
      this.navCtrl.push(DrugImagePage);
    else if (i == 2)
      this.navCtrl.push(DrugEffectPage);
    else if (i == 5)
      this.navCtrl.push(QuizPage);
    else if (i == 6)
      this.navCtrl.push(DrugResourcePage);
    else
    {
      if (i>2) i = i-2;
      this.navCtrl.push(DrugInfoPage, {"index": i});
    }
  }
  getJsonData() {
    this.info = null
    this.http.get("assets/json/prescription_review.json").map(response => response.json()).subscribe(data => {
        this.info = data;
    });
  }
}
