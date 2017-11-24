import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Platform } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { PrescriptionListPage } from '../prescription-list/prescription-list';

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
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public menu: MenuController, public rest: Rest,
        public platform: Platform) {
  	this.menu = menu;
  	this.data = this.navParams.get('data');
    console.log(this.data);

  }

  ionViewDidLoad() {
  	this.birthday = '';
    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 100;
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
    if (this.birthday != this.data['date_of_birth'])
      this.toggleDlg(1);
    else{
      this.navCtrl.push(PrescriptionListPage);
    }
  }
}
