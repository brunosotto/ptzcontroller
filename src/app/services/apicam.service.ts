import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CamerasService } from './cameras.service';

@Injectable({
  providedIn: 'root'
})
export class ApicamService {
  private apiCgiBase = '/web/cgi-bin/hi3510/';

  constructor(private http: HttpClient, private camerasService: CamerasService) { }

  // Move Setas
  moveUp(ipaddress: string, action, user, password){
     const loginBase64 = btoa(`${user}:${password}`);

     const headers = new HttpHeaders()
     .set('Authorization', `basic ${loginBase64}`);

     return this.http.get('http://' + ipaddress + this.apiCgiBase, { params: action, headers});
  }

  moveDown(ipaddress: string, action, user, password){
      const loginBase64 = btoa(`${user}:${password}`);
      const headers = new HttpHeaders()
     .set('Authorization', `basic ${loginBase64}`);

      return this.http.get('http://' + ipaddress + this.apiCgiBase, { params: action, headers });
  }

  moveLeft(ipaddress: string, action, user, password){
     const loginBase64 = btoa(`${user}:${password}`);

     const headers = new HttpHeaders()
     .set('Authorization', `basic ${loginBase64}`);

     return this.http.get('http://' + ipaddress + this.apiCgiBase, { params: action, headers });
  }

  moveRigth(ipaddress: string, action, user, password){
     const loginBase64 = btoa(`${user}:${password}`);

     const headers = new HttpHeaders()
     .set('Authorization', `basic ${loginBase64}`);

     return this.http.get('http://' + ipaddress + this.apiCgiBase, { params: action, headers });
    }

  // Enviando Presets
  sendPreset(ipaddress: string, action, user, password, options?: any ){
     const loginBase64 = btoa(`${user}:${password}`);

     const headers = new HttpHeaders()
     .set('Authorization', `basic ${loginBase64}`);

     return this.http.get('http://' + ipaddress + this.apiCgiBase, { params: action, headers });
  }

  // Setando configuraçao 
  sendConfigs(ipaddress: string, action, user, password, options?: any ) {
     const loginBase64 = btoa(`${user}:${password}`);

     const headers = new HttpHeaders()
     .set('Authorization', `basic ${loginBase64}`);

     return this.http.get(ipaddress, { params: action, headers });
  }
}
