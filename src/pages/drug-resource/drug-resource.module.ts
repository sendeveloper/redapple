import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugResourcePage } from './drug-resource';

@NgModule({
  declarations: [
    DrugResourcePage,
  ],
  imports: [
    IonicPageModule.forChild(DrugResourcePage),
  ],
  exports: [
    DrugResourcePage
  ]
})
export class DrugResourcePageModule {}
