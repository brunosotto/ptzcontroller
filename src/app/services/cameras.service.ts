import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ICamera } from './../models/camera.model';
import { OverlayService } from './overlay.service';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  public cameras: ICamera[] = [];


  constructor(private storage: Storage, private overlayService: OverlayService) { }

   async addCamera(camera: ICamera)  {
      let exist  = false;
      const load = await this.overlayService.loading({message: 'Aguarde...'});
      for ( const cam of this.cameras ){
        if ( cam.ipaddress === camera.ipaddress ) {
          exist = true;
        }
      }

      if ( exist ) {
        this.cameras = this.cameras.filter( cam => cam.ipaddress !== camera.ipaddress);
      } else {
        this.cameras.push( camera );
      }
      load.dismiss();

      this.storage.set('cameras', this.cameras);


      this.overlayService.toast({ message: 'Adicionado com sucesso.'});
      return !exist;

   }

    async getAllCamera()  {
     return this.storage.ready().then(async () => {
      const cams = await this.storage.get('cameras');
      this.cameras = cams || [];
      return this.cameras;
        }).catch((e) => console.log(e));
    }



   async getCamera( ipaddress ) {
     await this.getAllCamera();
     const cam = this.cameras.find( camera => camera.ipaddress === ipaddress );
     return  cam || [];
    //  return ( cam ) ? this.cameras : false;
   }


   async updateCamera(cam: ICamera){
     await this.getAllCamera();
     const ArrayCamUpdate = this.cameras.find(camera => camera.ipaddress === cam.ipaddress );
     this.storage.set('cameras', ArrayCamUpdate);
   }

   deleteCamera(ipaddress) {
     const ArrayCam = this.cameras.filter(res =>  res.ipaddress !== ipaddress  );
     this.storage.set('cameras', ArrayCam);
   }

}
