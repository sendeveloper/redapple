import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController, Tabs } from 'ionic-angular';
import { SuperTabsController } from '../../ionic2-super-tabs/src';
import { SuperTabs } from "../../ionic2-super-tabs/src/components/super-tabs";

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
  tabIndex: number;
  constructor(public navCtrl: NavController, 
      private superTabsCtrl: SuperTabsController,
      public navParams: NavParams, public rest: Rest) {
  }
  ionViewWillEnter() {
    this.tabIndex = this.navParams.data.tabIndex || 0;
    this.superTabs.slideTo(this.tabIndex);
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
    if (tab.index == 0)
      this.hideToolbar();
    else
      this.showToolbar();
    // this.tabIndex = tab.index;
    console.log(`Selected tab: `, tab.index);
  }
}
