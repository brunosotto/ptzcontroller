import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { ICamera } from '../models/camera.model';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class ApicamService {
   private apiCgiBase = 'web/cgi-bin/hi3510';

   constructor(
      private http: HTTP
   ) {

   }

   private getHeaders(cam: ICamera): HttpHeaders {
      const loginBase64 = btoa(`${cam.user}:${cam.password}`);
      const headers = new HttpHeaders()
         .set('Authorization', `basic ${loginBase64}`);
      return headers;
   }

   public async action(cam: ICamera, act: string): Promise<any> {
      const params = {
         '-step': '0',
         '-act': act,
         '-speed': '45',
      };
      const headers = this.http.getBasicAuthHeader(cam.user, cam.password);
      // return this.http.get(`http://${cam.ipaddress}/${this.apiCgiBase}/ptzctrl.cgi`, { params, headers});


      try {
         const url = `http://${cam.ipaddress}/${this.apiCgiBase}/ptzctrl.cgi`;

         const response = await this.http.get(url, params, headers);

         console.log(response.status);
         console.log(JSON.parse(response.data)); // JSON data returned by server
         console.log(response.headers);

      } catch (error) {
         console.error(error);
         // console.error(error.status);
         // console.error(error.error); // Error message as string
         // console.error(error.headers);
      }
   }

   public savePreset(cam: ICamera, preset: number): Observable<any> {
      return;
      // const params = {
      //    cmd: 'preset',
      //    '-act': 'set',
      //    '-status': '1',
      //    '-number': String(preset),
      // };
      // const headers = this.getHeaders(cam);
      // return this.http.get(`http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`, { params, headers });
   }

   public gotoPreset(cam: ICamera, preset: number): Observable<any> {
      return;
      // const params = {
      //    cmd: 'preset',
      //    '-act': 'goto',
      //    '-status': '0',
      //    '-number': String(preset),
      // };
      // const headers = this.getHeaders(cam);
      // return this.http.get(`http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`, { params, headers });
   }
}
