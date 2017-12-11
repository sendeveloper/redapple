import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-drug-effect',
  templateUrl: 'drug-effect.html',
})
export class DrugEffectPage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public menu: MenuController, public rest: Rest,
        public loadingCtrl: LoadingController,
        public http: Http, private sanitizer: DomSanitizer) {
  	this.menu = menu;
    this.data = null;
    
  }
  ionViewWillEnter() {
    this.navCtrl.parent.superTabsCtrl.showToolbar(false);
    this.rest.getDrugEffect(this);
  }
  ionViewDidLoad() {
  
  }
  showMenu() {
    this.menu.open();
  }
  setData(d){
    var params = ["side_effects", "precautions", "contraindications"];
    var titles = ["Side Effects", "Precautions", "Contraindications"];
    this.data = [];
    for (var i=0;i<params.length;i++)
    {
      var obj = {};
      obj['title'] = titles[i];
      obj['field'] = d[ params[i] ];
      this.data.push(obj);  
    }
  }
}
