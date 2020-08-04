import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ICamera } from './../models/camera.model';


@Injectable({
  providedIn: 'root'
})
export class CamerasService {
  constructor(private storage: Storage) { }

   addCamera(camera: ICamera): Promise<ICamera[]> {
      this.storage.set('cameras', camera);
      return this.storage.get('cameras').then((res)  => res).catch((e) => console.log(e));
   }

   getCamera(id: any): Promise<ICamera>  {
     this.storage.get('cameras').then((cam) => {
        if (id){
          cam.forEach(cams => {
            console.log(cams);
            return cams;
          });
        }
    });
     return;
   }
   getAllCamera(){
     return this.storage.get('cameras').then((res)  => res).catch((e) => console.log(e));
   }
   updateCamera(){}

   deleteCamera(){}

}
