import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPharmacistPage } from './chat-pharmacist';

@NgModule({
  declarations: [
    ChatPharmacistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPharmacistPage),
  ],
  exports: [
    ChatPharmacistPage
  ]
})
export class ChatPharmacistPageModule {}
