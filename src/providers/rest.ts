import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Rest {
  private deviceNumber: 0;
  private directApi: "https://redapplepharmacy.com/admin/server/api_interface.php";
  private proxyApi: "admin/server/api_interface.php";
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
    if (this.deviceNumber)
      return this.proxyApi;
    else
      return this.directApi;
  }
  public getInteractiveData(navCtrl, transitionPage) {
    var url = this.getApiURL() + "flag=check_active_code&code=" + this.code;
    console.log(url);
    this.http.get(url).map(response => response.json()).subscribe(data => {
        setTimeout(() => {
          console.log(data);
          if (data.status_code == 200)
          {

          }
          else
          {
          }
        });
      }),
      err => {
        
      }
  }

}
