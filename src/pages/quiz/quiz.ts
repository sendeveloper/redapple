import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { PrescriptionReviewPage } from '../prescription-review/prescription-review';
import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild(Content) content: Content;
  data: any;
  question: any;
  options: any;
  pos: number;
  count: number;
  answer: string;
  generic_name: string;
  answered: number;
  description: string;
  tabBarElement: any;
  dlg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public platform: Platform,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.pos = 0;
    this.count = 0;
    this.answer = '';
    this.answered = -1;
    this.description = '';
    this.options = [];
    this.question = {};
    this.generic_name = this.navParams.get('generic_name');
    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 100;
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
    this.answered = -1;
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
  optionSelect(i: number){
    this.answered = i;
    console.log(i);
    console.log(this.options[i]);
    if (this.options[i]['correct_answer'].toLowerCase() == 'no')
      this.description = this.question['wrong_answer_description'];
    else
      this.description = this.question['correct_answer_description'];
    this.toggleDlg(1);
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
  goContinue(){
    console.log(this.answered);
    console.log(this.options[this.answered]);
    if (!this.options[this.answered]['correct_answer'].toLowerCase() == 'no')
      this.goNext();
    this.toggleDlg(0);
  }
  toggleDlg(b: number)
  {
    if (b != 0)
    {
      var scrollPos = this.content.getContentDimensions().scrollTop;
      this.dlg['width'] = this.platform.width() * 0.9;
      if (this.dlg['width'] > this.dlg['maxWidth'])
        this.dlg['width'] = this.dlg['maxWidth'];
      this.dlg['left'] = (this.platform.width() - this.dlg['width']) / 2;
      this.dlg['top'] = (this.platform.height() - this.dlg['height']) / 2 + scrollPos + 30;
    }
    this.dlg['show'] = b;
  }
}
