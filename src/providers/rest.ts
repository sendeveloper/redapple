import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

let restApis = [
  'https://redapplepharmacy.com/admin/server/api_interface.php?',
  'admin/server/api_interface.php?'
];

@Injectable()
export class Rest {
  private deviceNumber: 0;
  private code: '';
  private ndc: '';
  constructor(public http: Http) {}

  public setCode(c) {this.code = c;}
  public getCode() { return this.code;}
  public setNdc(n) {this.ndc = n;}
  public getNdc() {return this.ndc;}
  public setDeviceNumber(device) {
      this.deviceNumber = device;
  }
  public getApiURL() {
    return restApis[this.deviceNumber];
    // if (this.deviceNumber)
    //   return this.proxyApi;
    // else
    //   return this.directApi;
  }
  public getInteractiveData(parent, transitionPage) {
    var url = this.getApiURL() + "flag=check_active_code&code=" + this.code;
    this.http.get(url).map(response => response.json()).subscribe(result => {
        setTimeout(() => {
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
      }
  }

}
