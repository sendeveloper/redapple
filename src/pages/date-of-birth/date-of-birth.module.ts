import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateOfBirthPage } from './date-of-birth';

@NgModule({
  declarations: [
    DateOfBirthPage,
  ],
  imports: [
    IonicPageModule.forChild(DateOfBirthPage),
  ],
  exports: [
    DateOfBirthPage
  ]
})
export class DateOfBirthPageModule {}
