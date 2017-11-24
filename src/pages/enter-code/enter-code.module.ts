import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterCodePage } from './enter-code';

@NgModule({
  declarations: [
    EnterCodePage,
  ],
  imports: [
    IonicPageModule.forChild(EnterCodePage),
  ],
  exports: [
    EnterCodePage
  ]
})
export class EnterCodePageModule {}
