import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrescriptionReviewPage } from './prescription-review';

@NgModule({
  declarations: [
    PrescriptionReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PrescriptionReviewPage),
  ],
  exports: [
    PrescriptionReviewPage
  ]
})
export class PrescriptionReviewPageModule {}
