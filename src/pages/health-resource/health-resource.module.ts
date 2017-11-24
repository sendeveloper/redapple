import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthResourcePage } from './health-resource';

@NgModule({
  declarations: [
    HealthResourcePage,
  ],
  imports: [
    IonicPageModule.forChild(HealthResourcePage),
  ],
  exports: [
    HealthResourcePage
  ]
})
export class HealthResourcePageModule {}
