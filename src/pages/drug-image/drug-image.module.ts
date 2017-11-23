import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugImagePage } from './drug-image';

@NgModule({
  declarations: [
    DrugImagePage,
  ],
  imports: [
    IonicPageModule.forChild(DrugImagePage),
  ],
  exports: [
    DrugImagePage
  ]
})
export class DrugImagePageModule {}
