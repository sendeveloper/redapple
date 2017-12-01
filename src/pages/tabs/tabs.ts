import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { Rest } from '../../providers/rest';

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
  constructor(public navParams: NavParams, public rest: Rest) {
  	this.tabIndex = navParams.data.tabIndex || 0;
  }
  isShow() {
  	return this.rest.getNdc() != '';
  }
}
