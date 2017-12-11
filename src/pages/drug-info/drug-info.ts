import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-drug-info',
  templateUrl: 'drug-info.html',
})
export class DrugInfoPage {
  yt_id: string;
  ind: number;
  info: any;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			public menu: MenuController, public rest: Rest,
        public loadingCtrl: LoadingController,
        public youtube: YoutubeVideoPlayer, private plt: Platform,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
    this.data = null;
    this.yt_id = '';
  }
  ionViewWillEnter() {
    this.rest.getDrugInformation(this);
    this.navCtrl.parent.superTabsCtrl.showToolbar(false);
  }
  ionViewDidLoad() {
    this.ind = this.navParams.get('index');
    this.getJsonData();  
  }
  showMenu() {
    this.menu.open();
  }
  youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }
  setData(d){
    this.data = d;
    if (this.ind == 3){
      if (this.plt.is('cordova')){
        var src = this.data['drug_video'];
        var b=src.match(/(<iframe.+?<\/iframe>)/g);
        if (b != null)
        {
          var l = b.length, i;
          for (i=0;i<l;i++)
          {
            var match = b[i].match(/\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/i);
            var url = match[1] || match[2] || match[3];
            var id = this.youtubeParser(url);
            if (id != false)
            {
              src = src.replace(b[i], '');
              this.yt_id = id;
              console.log(this.yt_id);
            }
          }
          this.data['drug_video'] = src;
        }
      }
    }
  }
  getJsonData() {
    this.info = null
    this.http.get("assets/json/drug_info.json").map(response => response.json()).subscribe(data => {
        this.info = data;
    });
  }
  playVideo() {
    if (this.yt_id != '' && this.yt_id.length > 0)
    {
      this.youtube.openVideo(this.yt_id);
    }
  }
}
