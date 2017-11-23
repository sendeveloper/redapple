import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: string = 'ChatPharmacistPage';
  tab2Root: string = 'PrescriptionListPage';
  tab3Root: string = 'PrescriptionReviewPage';
  tab4Root: string = 'ContactUsPage';
  constructor() {

  }
}
