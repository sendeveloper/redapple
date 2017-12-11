import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Rest } from '../../providers/rest';

@IonicPage()
@Component({
  selector: 'page-prescription-list',
  templateUrl: 'prescription-list.html',
})
export class PrescriptionListPage {
	data: any;
  data_count: number;
  first_name: string;
  custom_class: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public events: Events,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
  	this.data = null;
    this.custom_class = {};
    this.custom_class['Ready'] = 'green-text';
    this.custom_class['In Progress'] = 'blue-text';
    this.custom_class['On Order'] = 'orange-text';
    this.custom_class['YES'] = 'green-text';
    this.custom_class['NO'] = 'blue-text';

    this.data_count = 0;
  }
  ionViewWillEnter() {
    this.first_name = this.rest.getFirstName();
    this.rest.getDrugProperty(this);
    if (this.rest.isShowTab()){
      this.events.publish('menu:changed', 'Exit Review');
      this.navCtrl.parent._tabs[0].title = "Exit Review";
    }
  }
  reloadData() {
    this.rest.getDrugProperty(this);
  }
  ionViewWillLeave() {
    this.navCtrl.parent._tabs[0].title = "Home";
  }
  ionViewDidLoad() {
    
  }
  setData(d) {
    this.data = d;
    this.data_count = this.data.length;
    if (this.data_count > 0)
    {
      this.rest.setNdc(this.data[0]['ndc'])
      this.rest.setGenericName(this.data[0]['generic_name']);
    }
  }
  showMenu() {
    this.menu.open();
  }
  goReview(data) {
    this.rest.setNdc(data['ndc'])
    this.rest.setGenericName(data['generic_name']);
    this.navCtrl.parent.slideTo(2);
  }
}
