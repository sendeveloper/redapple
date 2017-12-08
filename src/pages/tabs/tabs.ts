import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('bottomTab') tabRef: Tabs;
  tab1Root: string = 'HomePage';
  tab2Root: string = 'PrescriptionListPage';
  tab3Root: string = 'PrescriptionReviewPage';
  tabIndex: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest) {
  }
  ionViewWillEnter() {
    this.tabIndex = this.navParams.data.tabIndex || 0;
    this.tabRef.select(this.tabIndex);
  }
  ionViewDidLoad() {
  	
  }
  selectTab(t: number) {
    if (t == 0){
      console.log(this.navCtrl);
      this.navCtrl.popToRoot();
    }
    this.tabIndex = t;
  }
}
