import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Loading } from 'ionic-angular';

let restApis = [
  'https://redapplepharmacy.com/admin/server/api_interface.php?',
  'admin/server/api_interface.php?'
];

@Injectable()
export class Rest {
  private deviceNumber: 0;
  private code: '';
  private ndc: '';
  private first_name: '';
  private loading: Loading;
  constructor(public http: Http) {
    this.loading = null;
    this.code = '';
    this.ndc = '';
  }

  public setCode(c) {this.code = c;}
  public getCode() { return this.code;}
  public setNdc(n) {this.ndc = n;}
  public getNdc() {return this.ndc;}
  public setFirstName(n) {this.first_name = n;}
  public getFirstName() {return this.first_name;}
  public setDeviceNumber(device) {
      this.deviceNumber = device;
  }
  public getApiURL() {
    return restApis[this.deviceNumber];
  }
  public getInteractiveData(parent, transitionPage) {
    var url = this.getApiURL() + "flag=check_active_code&code=" + this.code;
    var self = this;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200 && result.count>0)
          {
            this.setNdc(result.data[0]['ndc1']);
            parent.navCtrl.push(transitionPage, {'data': result.data[0]});
          }
          else
          {
            parent.toggleDlg(1);
          }
        });
      }),
      err => {
        parent.toggleDlg(1);
        self.hideLoading();
      }
  }
  public getDrugProperty(parent) {
    var url = this.getApiURL() + "flag=get_drug_property&ndc=" + this.getNdc();
    var self = this;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200 && result.count>0)
          {
            parent.setData(result.data);
          }
          else
          {
          }
        });
      }),
      err => {
        self.hideLoading();
      }
  }
  public getDrugInformation(parent) {
    var url = this.getApiURL() + "flag=drug_information&ndc=" + this.getNdc();
    var self = this;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200 && result.count>0)
          {
            parent.setData(result.data[0]);
          }
          else
          {
          }
        });
      }),
      err => {
        self.hideLoading();
      }
  }
  public getDrugImage(parent) {
    var url = this.getApiURL() + "flag=drug_image&ndc=" + this.getNdc();
    var self = this;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200 && result.count>0)
          {
            parent.setData(result.data);
          }
          else
          {
          }
        });
      }),
      err => {
        self.hideLoading();
      }
  }
  public getDrugEffect(parent) {
    var url = this.getApiURL() + "flag=drug_information&ndc=" + this.getNdc();
    var self = this;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200 && result.count>0)
          {
            parent.setData(result.data[0]);
          }
          else
          {
          }
        });
      }),
      err => {
        self.hideLoading();
      }
  }
  public changeDateFormatUTC(date) {
    var d = new Date(date);
    var offset = d.getTimezoneOffset() * 60 * 1000;
    return d.getTime() - offset;
  }
  public changeDateFormat(date) {
    var d = new Date(date);
    return d.getTime();
  }
  private hideLoading() {
    this.loading.dismiss().catch(() => {});
  }
  private showLoading(parent) {
    this.loading = parent.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}
