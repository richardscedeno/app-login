import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private URL_API: string = 'http://192.168.100.219/api/';

  constructor( private http:HttpClient, private toastController:ToastController, private route:Router) { }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  };

  _login(_usr:string, _pass:string) {
    let url = `${this.URL_API}login`

    return this.http.post<any>(url, this.objectToFormData({
      usr: _usr,
      pass: _pass
    }))
  }

  _getPerson(_ci:string) {
    let url = `${this.URL_API}person/${_ci}`
    return this.http.get<any>(url)
  }

  _getAcceso(_id:number) {
    let url = `${this.URL_API}access/${_id}`
    return this.http.get<any>(url)
  }

  _getMenuByAccess(_id:number) {
    let url = `${this.URL_API}menu/${_id}`
    return this.http.get<any>(url)
  }

  async message(texto:string, micolor:string="success"){
    let t=await this.toastController.create({
      message:texto,
      color:micolor,
      duration:2000
    });
    t.present();
  }

  redirectTo(pagina:string){
    this.route.navigateByUrl(pagina);
  }
}
