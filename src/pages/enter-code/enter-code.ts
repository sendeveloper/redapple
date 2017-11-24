import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Content, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rest } from '../../providers/rest';

import { HomePage } from '../home/home';
import { DateOfBirthPage } from '../date-of-birth/date-of-birth';

@IonicPage()
@Component({
  selector: 'page-enter-code',
  templateUrl: 'enter-code.html',
})
export class EnterCodePage {
  @ViewChild(Content) content: Content;
  scode: string;
  dlg: any;
  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public http: Http, private sanitizer: DomSanitizer,
        public menu: MenuController, public rest: Rest,
        public platform: Platform) {
    this.menu = menu;

    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 100;
  }

  ionViewDidLoad() {
    this.scode = '';
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
  goCancel() {
  	this.navCtrl.push(HomePage);
  }
  goContinue() {
    if (this.scode == "")
      this.toggleDlg(1);
    else
  	 this.navCtrl.push(DateOfBirthPage, {'code': this.scode});
  }
}
