import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { ICamera } from '../models/camera.model';
import { Observable } from 'rxjs';
import { IImageConfig } from '../models/image.model';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class ApicamService {
   private apiCgiBase = 'web/cgi-bin/hi3510';

   constructor(
      private http: HTTP
   ) {

   }

   private request(cam: ICamera, url: string, params: any): Observable<HTTPResponse> {
      return new Observable(subscriber => {
         const headers = this.http.getBasicAuthHeader(cam.user, cam.password);

         try {
            this.http.get(url, params, headers).then(response => {
               subscriber.next(response);
            });
         } catch (error) {
            console.error(error);
            subscriber.error(error);
         }
         subscriber.complete();
      });
   }

   public action(cam: ICamera, act: string): Observable<HTTPResponse> {
      const url = `http://${cam.ipaddress}/${this.apiCgiBase}/ptzctrl.cgi`;
      const params = {
         '-step': '0',
         '-act': act,
         '-speed': '45',
      };
      return this.request(cam, url, params);
   }

   public savePreset(cam: ICamera, preset: number): Observable<HTTPResponse> {
      const url = `http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`;
      const params = {
         cmd: 'preset',
         '-act': 'set',
         '-status': '1',
         '-number': String(preset),
      };
      return this.request(cam, url, params);
   }

   public gotoPreset(cam: ICamera, preset: number): Observable<HTTPResponse> {
      const url = `http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`;
      const params = {
         cmd: 'preset',
         '-act': 'goto',
         '-status': '0',
         '-number': String(preset),
      };
      return this.request(cam, url, params);
   }

   public getImageConfig(cam: ICamera): Observable<IImageConfig> {
      const url = `http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`;
      const params = {
         cmd: 'getimageattr',
      };
      return this.request(cam, url, params)
         .pipe(
            map(response => {
               const keys = ['brightness', 'saturation', 'contrast', 'targety'];
               const config: IImageConfig = response.data
                  .split(/\n/g).map(v => {
                     return {
                        key: v.split('var ').pop().split('=').shift(),
                        value: v.match(/"(?:[^"\\]|\\.)*"/).shift().replace(/\"/g, ''),
                     };
                  })
                  .filter(v => !!keys.find(k => k === v.key))
                  .reduce((o, v) => { o[v.key] = parseInt(v.value, 10); return o; }, {});
               return config;
            })
         );
   }

   public setImageConfig(cam: ICamera, image: IImageConfig): Observable<HTTPResponse> {
      const url = `http://${cam.ipaddress}/${this.apiCgiBase}/param.cgi`;
      const params = {
         cmd: 'setimageattr',
         '-image_type': '1',
         '-targety': image.targety && String(image.targety),
         '-brightness': image.brightness && String(image.brightness),
         '-saturation': image.saturation && String(image.saturation),
         '-contrast': image.contrast && String(image.contrast),
      };
      return this.request(cam, url, params);
   }
}
