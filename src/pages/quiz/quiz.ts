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
  question: any;
  options: any;
  pos: number;
  count: number;
  answer: string;
  generic_name: string;
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.pos = 0;
    this.count = 0;
    this.answer = '';
    this.options = [];
    this.question = {};
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
    this.count = this.data.questions.length;
    this.initQuestion();
    console.log(d);
  }
  initQuestion() {
    var question_id = this.data.questions[this.pos-1]['quiz_questions_id'];
    this.question = {};
    this.options = [];
    if (question_id != undefined)
    {
      this.question = this.data.questions[this.pos-1];
      for (var i=0;i<this.data.options.length;i++)
      {
        var option = this.data.options[i];
        if (option['quiz_questions_id'] == question_id)
          this.options.push(option);
      }
      console.log(this.data.options);
      console.log(question_id);
      console.log(this.question);
      console.log(this.options);
    }
  }
  optionSelect(opt: any){
    console.log(opt);
  }
  goNext() {
    if (this.pos < this.count)
    {
      this.pos++;
      console.log(this.pos);
      this.initQuestion();
    }
  }
  closeQuiz() {
    this.navCtrl.push(PrescriptionReviewPage, {'generic_name': this.generic_name});
  }
}
