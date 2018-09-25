import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Rx';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-prescription-list',
  templateUrl: 'prescription-list.html',
})
export class PrescriptionListPage {
  @ViewChild(Content) content: Content;
  scode: string;
  dlg: any;
  data_count: number;
  first_name: string;
  custom_class: any;
  message: string;
  datetime: string;
  data: any;
  add_sound: any;
  disableRemind: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public events: Events,
  			public menu: MenuController, public rest: Rest, private smsVar: SMS,
        private localNotifications: LocalNotifications,
        public platform: Platform) {
  	this.menu = menu;
  	this.data = null;
    this.custom_class = {};
    this.custom_class['Ready'] = 'green-text';
    this.custom_class['In Progress'] = 'blue-text';
    this.custom_class['On Order'] = 'orange-text';
    this.custom_class['YES'] = 'green-text';
    this.custom_class['NO'] = 'blue-text';

    this.data_count = 0;

    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 100;
    
  }
  ionViewWillEnter() {
    this.navCtrl.parent.superTabsCtrl.showToolbar(true);
    this.first_name = this.rest.getFirstName();
    this.rest.getDrugProperty(this);
    if (this.rest.isShowTab()){
      this.events.publish('menu:changed', 'Exit Review');
      this.navCtrl.parent._tabs[0].title = "Exit Review";
    }
  }
  reloadData() {
    // this.rest.getDrugProperty(this);
  }
  ionViewWillLeave() {
    this.navCtrl.parent._tabs[0].title = "Home";
  }
  ionViewDidLoad() {
    
  }
  setData(d) {
    this.data = d;
    this.data_count = this.data.length;
    if (this.data_count > 0)
    {
      this.rest.setNdc(this.data[0]['ndc'])
      this.rest.setGenericName(this.data[0]['generic_name']);
    }
  }
  showMenu() {
    this.menu.open();
  }
  goReview(data) {
    this.rest.setNdc(data['ndc'])
    this.rest.setGenericName(data['generic_name']);
    this.navCtrl.parent.slideTo(2);
  }

  remindButton() {
    // this.localNotifications.schedule({
    //   id: 1,
    //   text: 'Single ILocalNotification',
    //   sound: 'tone/alarm.mp3'
    // });
    this.toggleDlg(5);
  }
  contactPharmacy() {
    this.toggleDlg(3);
  }
  deliverButton() {
    this.toggleDlg(1);
  }
  toggleDlg(b: number)
  {
    if (b % 2 == 1)
    {
      var scrollPos = this.content.getContentDimensions().scrollTop;
      this.dlg['width'] = this.platform.width() * 0.9;
      if (this.dlg['width'] > this.dlg['maxWidth'])
        this.dlg['width'] = this.dlg['maxWidth'];
      this.dlg['left'] = (this.platform.width() - this.dlg['width']) / 2;
      if (b == 5) {
        this.dlg['height'] = 180;
        let dt = new Date();
        let offset = -240; //Timezone offset for EST in minutes.
        this.datetime = new Date(dt.getTime() + offset*60*1000).toISOString();
      }
      this.dlg['top'] = (this.platform.height() - this.dlg['height']) / 2 + scrollPos - 30;
    }
    else if (b == 2)
    {
      var options={
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
               intent: 'INTENT'  // Opens Default sms app
              //intent: '' // Sends sms without opening default sms app
            }
      }
      this.smsVar.send(this.rest.getCellPhone(), 'Patient request delivery',options)
        .then(()=>{
          alert("success");
        },()=>{
          alert("failed");
        });
      // this.rest.deliverMessage(this);
    }
    else if (b == 4) {
      var options={
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
               intent: 'INTENT'  // Opens Default sms app
              //intent: '' // Sends sms without opening default sms app
            }
      }
      b = 0;
      this.smsVar.send(this.rest.getCellPhone(), this.message ,options)
        .then(()=>{
          alert("success");
        },()=>{
          alert("failed");
        });
    }
    else if (b == 6) {
      b = 0;
      this.disableRemind = false;
      this.startReminder();
    }
    else if (b == 8) {
      b = 0;
      this.datetime = new Date('December 17, 1995 03:24:00');
      this.disableRemind = true;
    }
    this.dlg['show'] = b;
  }
  startReminder() {
    let __this =this;
    if (!this.disableRemind) {
      let date = new Date().getTime();
      let reminder = new Date(__this.datetime).getTime();
      date += -240*60*1000;
      if (reminder > date){
        setTimeout(function() {
          __this.startReminder();
        }, 1000);
      }
      else if ((date - reminder) <= 1000)
      {
        let setting = {
          id: 1,
          text: "Reminder Notification"
        }
        if (__this.add_sound)
          setting['sound'] = 'tone/alar.mp3';
        __this.localNotifications.schedule(setting);
      }
      else{
        __this.disableRemind = true;
      }
    }
  }
}
