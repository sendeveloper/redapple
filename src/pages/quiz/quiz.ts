import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { PrescriptionReviewPage } from '../prescription-review/prescription-review';
import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  data: any;
  pos: number;
  count: number;
  answer: string;
  generic_name: string;
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.pos = 1;
    this.count = 0;
    this.answer = '';
    this.generic_name = this.navParams.get('generic_name');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    rest.getQuizData(this);
  }
  ionViewWillEnter() {
    if (this.rest.isShowTab())
      this.tabBarElement.style.display = 'none';
  }
  ionViewDidLoad() {
    
  }
  showMenu() {
    this.menu.open();
  }
  setData(d) {
    this.data = d;
    this.pos = 1;
    this.initQuestion();
    console.log(d);
  }
  initQuestion() {
    
  }
  goNext() {
    this.pos++;
    console.log(this.pos);
  }
  closeQuiz() {
    this.navCtrl.push(PrescriptionReviewPage, {'generic_name': this.generic_name});
  }
}
