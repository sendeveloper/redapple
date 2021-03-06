import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, Content, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { EnterCodePage } from '../enter-code/enter-code';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  dlg: any;
  previousTab: number;
  constructor(public navCtrl: NavController, public menu: MenuController, public events: Events,
            public platform: Platform, public rest: Rest) {
    var self = this;
    this.menu = menu;
    this.previousTab = 0;
    this.initDlg();

    events.subscribe('home:changed', (id) => {
      this.toggleDlg(1);
    });
  }
  initDlg(){
    this.dlg = {};
    this.dlg['show'] = 0;
    this.dlg['maxWidth'] = 600;
    this.dlg['left'] = 0;
    this.dlg['top'] = 0;
    this.dlg['width'] = 200;
    this.dlg['height'] = 70;
  }
  ionViewDidLoad() {
    
  }
  ionViewWillEnter() {
    var self = this;
    if (self.rest.getPreviousTab() != 0)
    {
      self.previousTab = self.rest.getPreviousTab();
      self.rest.setPreviousTab(0);
      self.initDlg();
      self.toggleDlg(1);
    }
    self.events.publish('menu:changed', 'Home');
  }
  ionViewWillLeave() {
    
  }
  dlgClose(mode: number)
  {
    this.toggleDlg(0);
    if (mode == 1){
      var self = this;
      setTimeout(function() {
        if (self.rest.getCode() != '')
        {
          self.rest.resetData();
        }
      }, 400);
    }
    else{
      if (this.previousTab != 0)
        this.navCtrl.parent.slideTo(this.previousTab);
    }
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
  showMenu() {
    this.menu.open();
  }
  goNext() {
    this.rest.setPreviousTab(0);
    this.navCtrl.push(EnterCodePage);
  }
}
