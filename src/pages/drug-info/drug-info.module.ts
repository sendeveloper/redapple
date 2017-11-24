import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugInfoPage } from './drug-info';

@NgModule({
  declarations: [
    DrugInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugInfoPage),
  ],
  exports: [
    DrugInfoPage
  ]
})
export class DrugInfoPageModule {}
