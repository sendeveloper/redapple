import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  data: any;
  pos: number;
  max: number;
  answer: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.pos = 0;
    this.max = 0;
    this.answer = '';
    rest.getQuizData(this);
  }
  
  ionViewDidLoad() {
    
  }
  showMenu() {
    this.menu.open();
  }
  setData(d) {
    this.data = d;
    // this.max = 
    console.log(d);
  }
  goNext() {
    this.pos++;
    console.log(this.pos);
  }
}
