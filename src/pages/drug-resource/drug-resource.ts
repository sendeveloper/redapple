import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SMS } from '@ionic-native/sms';

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
    // 1: QuizPage
  };
  info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest, private smsVar: SMS,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
  }
  ionViewWillEnter() {
    this.navCtrl.parent.superTabsCtrl.showToolbar(false);
  }
  ionViewDidLoad() {
    this.getJsonData();
  }
  showMenu() {
    this.menu.open();
  }
  transit(i: number) {
    if (i>=1)
      this.navCtrl.push(DrugInfoPage, {"index": (i+2)});
    else{
      console.log('send sms', this.rest.getCellPhone());
      var options={
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
               intent: 'INTENT'  // Opens Default sms app
              //intent: '' // Sends sms without opening default sms app
            }
      }
      this.smsVar.send(this.rest.getCellPhone(), '',options)
        .then(()=>{
          alert("success");
        },()=>{
          alert("failed");
        });
      // this.navCtrl.push(this.pages[i]);
    }
  }
  getJsonData() {
    this.info = null
    this.http.get("assets/json/drug_resource.json").map(response => response.json()).subscribe(data => {
        this.info = data;
    });
  }
}
