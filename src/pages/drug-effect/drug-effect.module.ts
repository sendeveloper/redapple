import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugEffectPage } from './drug-effect';

@NgModule({
  declarations: [
    DrugEffectPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugEffectPage),
  ],
  exports: [
    DrugEffectPage
  ]
})
export class DrugEffectPageModule {}
