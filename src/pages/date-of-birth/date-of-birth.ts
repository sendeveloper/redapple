import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-date-of-birth',
  templateUrl: 'date-of-birth.html',
})
export class DateOfBirthPage {
  @ViewChild(Content) content: Content;
	data: any;
  birthday: string;
  dlg: any;
  warning_msg: string;
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public events: Events,
        public menu: MenuController, public rest: Rest,
        public platform: Platform) {
    var self = this;
  	this.menu = menu;
  	this.data = this.navParams.get('data');
    this.birthday = '';
    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 100;

    events.subscribe('return:home', (id) => {
      console.log(id);
      if(id != 0)
      {
        self.rest.setPreviousTab(id);
        self.events.publish('home:changed', 'Home');
      }
      if (self && self.navCtrl)
        self.navCtrl.popToRoot();
    });
  }
  ionViewWillEnter() {

  }
  ionViewWillLeave() {

  }
  ionViewDidLoad() {
  	
  }
  showMenu() {
    this.menu.open();
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
      this.dlg['top'] = (this.platform.height() - this.dlg['height']) / 2 + scrollPos - 30;
    }
    this.dlg['show'] = b;
  }
  getList() {
    if (this.birthday == ""){
      this.warning_msg = "Need Date of Birth";
      this.toggleDlg(1);
    }
    else
    {
      var birth1, birth2;
      birth1 = this.rest.changeDateFormat(this.birthday);
      birth2 = this.rest.changeDateFormatUTC(this.data['date_of_birth']);
      if (birth1 != birth2){
        this.warning_msg = "Date of birth does not match Rx review code. Please contact the pharmacy.";
        this.toggleDlg(1);
      }
      else{
        this.rest.setFirstName(this.data['patient_first_name']);
        this.navCtrl.parent.slideTo(1);
      }
    }
  }
}
