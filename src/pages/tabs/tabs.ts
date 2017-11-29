import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: string = 'HomePage';
  tab2Root: string = 'ChatPharmacistPage';
  tab3Root: string = 'PrescriptionListPage';
  tab4Root: string = 'PrescriptionReviewPage';
  tabIndex: number;
  constructor(public navParams: NavParams) {
  	this.tabIndex = navParams.data.tabIndex || 0;
  	console.log(this.tabIndex);
  }
}
