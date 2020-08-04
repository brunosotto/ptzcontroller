import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CamerasService } from './cameras.service';

@Injectable({
  providedIn: 'root'
})
export class ApicamService {

  constructor(private http: HttpClient, private camerasService: CamerasService) { }

  // Move Setas

  moveUp(ipaddress: string, movU ){
     const headers = new HttpHeaders();
     return this.http.get(ipaddress, { params: movU });
  }

  moveDown(ipaddress: string, movD: any  ){
     const headers = new HttpHeaders();
     return this.http.get(ipaddress, { params: movD });
  }

  moveLeft(ipaddress: string, movL: any ){
     const headers = new HttpHeaders();
     return this.http.get(ipaddress, { params: movL });
  }

  moveRigth(ipaddress: string , movR: any ){
      const headers = new HttpHeaders();
      return this.http.get(ipaddress, { params: movR });
    }

  // Enviando Presets

  sendPreset(ipaddress: string , preset: any){
   return this.http.get(ipaddress, { params: preset });
  }

  sendConfigs(ipaddress: string, configs: any) {
    return this.http.get(ipaddress, {params: configs });
  }
}
