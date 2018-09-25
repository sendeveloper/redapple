import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SuperTabsModule } from '../ionic2-super-tabs/src';

import { HttpClientModule } from '@angular/common/http'

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Rest } from '../providers/rest';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      preloadModules: true,
      backButtonText: '',
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Rest,
    YoutubeVideoPlayer
  ]
})
export class AppModule {}
