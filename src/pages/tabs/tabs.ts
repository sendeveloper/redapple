import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: string = 'HomePage';
  tab2Root: string = 'ChatPharmacistPage';
  tab3Root: string = 'PrescriptionListPage';
  tab4Root: string = 'PrescriptionReviewPage';
  tab5Root: string = 'ContactUsPage';
  constructor() {

  }
}
