import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugImagesPage } from './drug-images';

@NgModule({
  declarations: [
    DrugImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugImagesPage),
  ],
  exports: [
    DrugImagesPage
  ]
})
export class DrugImagesPageModule {}
