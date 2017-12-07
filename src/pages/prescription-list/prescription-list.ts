import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Rest } from '../../providers/rest';

import { PrescriptionReviewPage } from '../prescription-review/prescription-review';

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
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController,
  			public menu: MenuController, public rest: Rest) {
  	this.menu = menu;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  	this.data = null;
    this.custom_class = {};
    this.custom_class['Ready'] = 'green-text';
    this.custom_class['In Progress'] = 'blue-text';
    this.custom_class['On Order'] = 'orange-text';
    this.custom_class['YES'] = 'green-text';
    this.custom_class['NO'] = 'blue-text';

    this.data_count = 0;
    this.first_name = rest.getFirstName();
    rest.getDrugProperty(this);
  }
  ionViewWillEnter() {
    if (this.rest.isShowTab()){
      this.tabBarElement.style.display = 'flex';
      this.navCtrl.parent._tabs[0].tabTitle = "Exit Review";
    }
  }
  refresh() {
    console.log('a');
    this.rest.getDrugProperty(this);
  }
  ionViewWillLeave() {
    this.navCtrl.parent._tabs[0].tabTitle = "Home";
  }
  ionViewDidLoad() {
    
  }
  setData(d) {
    this.data = d;
    this.data_count = this.data.length;
  }
  showMenu() {
    this.menu.open();
  }
  goReview(generic_name) {
    this.navCtrl.push(PrescriptionReviewPage, {'generic_name': generic_name});
  }
}
