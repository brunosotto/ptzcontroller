import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICamera } from '../models/camera.model';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class ApicamService {
   private apiCgiBase = 'web/cgi-bin/hi3510';

   constructor(
      private http: HttpClient,
   ) {

   }

   private getHeaders(cam: ICamera): HttpHeaders {
      const loginBase64 = btoa(`${cam.user}:${cam.password}`);
      const headers = new HttpHeaders()
         .set('Authorization', `basic ${loginBase64}`);
      return headers;
   }

   public action(cam: ICamera, act: string): Observable<any> {
      const params = {
         '-step': '0',
         '-act': act,
         '-speed': '45',
      };
      const headers = this.getHeaders(cam);
      return this.http.get(`http://${cam.ipaddress}/${this.apiCgiBase}/ptzctrl.cgi`, { params, headers});
   }

   public savePreset(cam: ICamera, preset: number): Observable<any> {
      const params = {
         cmd: 'preset',
         '-act': 'set',
         '-status': '1',
         '-number': String(preset),
      };
      const headers = this.getHeaders(cam);
      return this.http.get(`http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`, { params, headers });
   }

   public gotoPreset(cam: ICamera, preset: number): Observable<any> {
      const params = {
         cmd: 'preset',
         '-act': 'goto',
         '-status': '0',
         '-number': String(preset),
      };
      const headers = this.getHeaders(cam);
      return this.http.get(`http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`, { params, headers });
   }
}
