import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Loading } from 'ionic-angular';

let restApis = [
  'https://redapplepharmacy.com/admin/server/api_interface.php?',
  'admin/server/api_interface.php?'
];

@Injectable()
export class Rest {
  private deviceNumber: number;
  private code: string;
  private cell_phone: string;
  private ndc: string;
  private first_name: string;
  private generic_name: string;
  private loading: Loading;
  constructor(public http: Http) {
    this.resetData();
  }
  public resetData() {
    this.loading = null;
    this.deviceNumber = 0;
    this.code = '';
    this.cell_phone = '';
    this.ndc = '';
    this.first_name = '';
    this.generic_name = '';
  }
  public isShowTab() { return (this.ndc != '' && this.first_name != '') ? true : false}
  public setCode(c) {this.code = c;}
  public getCode() { return this.code;}
  public setCellPhone(c) {this.cell_phone = c;}
  public getCellPhone() { return this.cell_phone;}
  public setNdc(n) {this.ndc = n;}
  public getNdc() {return this.ndc;}
  public setFirstName(n) {this.first_name = n;}
  public getFirstName() {return this.first_name;}
  public setGenericName(n) {this.generic_name = n;}
  public getGenericName() {return this.generic_name;}
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
    try{
      this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200 && result.count>0)
          {
            self.setNdc(result.data[0]['ndc1']);
            self.setCellPhone(result.data[0]['patient_cellphone']);
            parent.navCtrl.push(transitionPage, {'data': result.data[0]});
          }
          else
          {
            parent.toggleDlg(1);
          }
        });
      }),
      err => {
        self.hideLoading();
        parent.toggleDlg(1);
      }
    }catch(e){
      console.log(e);
    }
  }
  public getDrugProperty(parent) {
    var url = this.getApiURL() + "flag=get_drug_property&code=" + this.getCode();
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
  public getQuizData(parent) {
    var url = this.getApiURL() + "flag=quiz_get&ndc=" + this.getNdc();
    var self = this;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200)
          {
            if (result.data['questions'] == undefined || result.data['questions'].length == 0)
              parent.setPage(2);
            else
              parent.setData(result.data);
          }
          else
          {
            parent.setPage(2);
          }
        });
      }),
      err => {
        self.hideLoading();
      }
  }
  public saveQuestions(parent, answers){
    var url = this.getApiURL() + "flag=quiz_save&code=" + this.getCode() + "";
    var self = this;
    for (var i=0;i<answers.length;i++)
    {
      url += '&qid' + (i+1) + '=' + answers[i]['qid'];
      url += '&answer' + (i+1) + '=' + answers[i]['answer'];
    }
    url += '&count=' + answers.length;
    this.showLoading(parent);
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
          self.hideLoading();
          if (result.status_code == 200)
          {
            parent.setPage(1);
          }
          else
          {
            parent.setPage(1);
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
