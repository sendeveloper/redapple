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
  page: any;
  data: any;
  question: any;
  options: any;
  pos: number;
  count: number;
  answer: string;
  user_answer: any;
  generic_name: string;
  answered: number;
  item_height: number;
  description: string;
  tabBarElement: any;
  customClasses: any;
  correctCount: number;
  thank_msg: string;
  dlg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public platform: Platform,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.page = 0;
    this.pos = 0;
    this.count = 0;
    this.correctCount = 0;
    this.answer = '';
    this.answered = -1;
    this.item_height = 0;
    this.description = '';
    this.options = [];
    this.question = {};
    this.user_answer = [];
    this.generic_name = this.navParams.get('generic_name');
    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 100;
    this.customClasses = ["purple", "red", "green", "blue"];
    this.thank_msg = "";
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }
  ionViewWillEnter() {
    rest.getQuizData(this);
    if (this.rest.isShowTab())
      this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.navCtrl.parent._tabs[0].tabTitle = "Home";
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
      if (this.options.length > 0)
        this.item_height = Math.round((this.platform.height() - 260) / this.options.length);
      else
        this.item_height = 40;
    }
  }
  optionSelect(i: number){
    var obj = {};
    this.answered = i;
    obj['qid'] = this.options[i]['quiz_questions_id'];
    obj['answer'] = this.options[i]['quiz_options'];
    this.user_answer.push(obj);
    if (this.options[i]['correct_answer'].toLowerCase() == 'no')
      this.description = this.question['wrong_answer_description'] + "<p>Click next to go to next question</p>";
    else{
      this.correctCount ++;
      this.description = this.question['correct_answer_description'];
    }
    this.toggleDlg(1);
  }
  goNext() {
    if (this.pos < this.count)
    {
      this.pos++;
      this.initQuestion();
    }
    else
    {
      this.rest.saveQuestions(this, this.user_answer);
    }
  }
  setPage(n: number){
    this.page = n;
    if (n != 0 && this.rest.isShowTab()){
      var percent;
      percent = Math.round(this.correctCount * 100 / this.count);
      if (percent == 100)
        this.thank_msg = "Perfect! You scored 100%";
      else if (percent >= 50)
        this.thank_msg = "Good Job! You scored " + percent + "%";
      else
        this.thank_msg = "You scored " + percent + "%";
      this.tabBarElement.style.display = 'flex';
      this.navCtrl.parent._tabs[0].tabTitle = "Exit Review";
    }
  }
  closeQuiz() {
    this.navCtrl.push(PrescriptionReviewPage, {'generic_name': this.generic_name});
  }
  goContinue(){
    // if (this.options[this.answered]['correct_answer'].toLowerCase() == 'yes')
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
