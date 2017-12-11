import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { SuperTabsController } from '../../ionic2-super-tabs/src';
import { SuperTabs } from "../../ionic2-super-tabs/src/components/super-tabs";
import { Events } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  tab1Root: string = 'HomePage';
  tab2Root: string = 'PrescriptionListPage';
  tab3Root: string = 'PrescriptionReviewPage';
  previousTab: number;
  constructor(public navCtrl: NavController, 
      public events: Events,
      private superTabsCtrl: SuperTabsController,
      public navParams: NavParams, public rest: Rest) {
  }
  ionViewWillEnter() {
    var tabIndex = this.navParams.data.tabIndex || 0;
    this.previousTab = 0;
    this.superTabs.slideTo(tabIndex);
  }
  ionViewDidLoad() {
  	
  }
  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }
  
  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }
  onTabSelect(tab: { index: number; id: string; }) {
    if (tab.index == 0){
      this.hideToolbar();
      this.events.publish('returnView', 0);
      // if (this.previousTab == 1){
      //   this.events.publish('returnView', this.previousTab);
      // }
    }
    console.log(this.navCtrl.length());
    console.log(`Selected tab: `, tab.index, this.previousTab);
    this.previousTab = tab.index;
  }
}
