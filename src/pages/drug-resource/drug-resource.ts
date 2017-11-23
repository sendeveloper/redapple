import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { ChatPharmacistPage } from '../chat-pharmacist/chat-pharmacist';
import { QuizPage } from '../quiz/quiz';
import { VideosPage } from '../videos/videos';
import { HealthResourcePage } from '../health-resource/health-resource';

@IonicPage()
@Component({
  selector: 'page-drug-resource',
  templateUrl: 'drug-resource.html',
})
export class DrugResourcePage {
  pages = {
    0: ChatPharmacistPage,
    1: QuizPage,
    2: VideosPage,
    3: HealthResourcePage
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  }
  
  ionViewDidLoad() {
    
  }
  showMenu() {
    this.menu.open();
  }
  transit(i: number) {
  	this.navCtrl.push(this.pages[i]);
  }
}
