import { OverlayService } from './overlay.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ICamera } from './../models/camera.model';


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
        if ( cam.id === camera.id ) {
          exist = true;
        }
      }

      if ( exist ) {
        this.cameras = this.cameras.filter( cam => cam.id !== camera.id);
      } else {
        this.cameras.push( camera );
      }
      load.dismiss();
      this.storage.set('cameras', this.cameras);
      this.overlayService.toast({ message: 'Adicionado com sucesso.'});
      return !exist;

   }

    async getAllCamera()  {
         const cams = await this.storage.get('cameras');
         this.cameras = cams || [];
         return this.cameras;
    }



   async getCamera( id ) {
     await this.getAllCamera();
     const exist = this.cameras.find( cam => cam.id === id);
     return ( exist ) ? true : false;
   }


   async updateCamera(id){
     await this.getAllCamera();
     const exist = this.cameras.find( cam => cam.id === id);
     return ( exist ) ? true : false;
   }

   deleteCamera(id) {
     const ArrayCam = this.cameras.filter(res =>  res.id !== id  );
     this.storage.set('cameras', ArrayCam);
   }

}
