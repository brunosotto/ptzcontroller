import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ICamera } from './../models/camera.model';
import { OverlayService } from './overlay.service';

const CAMERA_STORAGE = 'cameras';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  public cameras: ICamera[] = [];


  constructor(private storage: Storage, private overlayService: OverlayService) { }

  async addCamera(camera: ICamera) {
    let exist = false;
    const load = await this.overlayService.loading({ message: 'Aguarde...' });
    for (const cam of this.cameras) {
      if (cam.ipaddress === camera.ipaddress) {
        exist = true;
      }
    }

    if (exist) {
      this.cameras = this.cameras.filter(cam => cam.ipaddress !== camera.ipaddress);
    } else {
      this.cameras.push(camera);
    }
    load.dismiss();

    this.storage.set(CAMERA_STORAGE, this.cameras);


    this.overlayService.toast({ message: 'Adicionado com sucesso.' });
    return !exist;

  }

  async getAllCamera() {
    return this.storage.ready().then(async () => {
      const cams = await this.storage.get(CAMERA_STORAGE);
      this.cameras = cams || [];
      return this.cameras;
    }).catch((e) => console.log(e));
  }



  async getCamera(ipaddress) {
    await this.getAllCamera();
    const cam = this.cameras.find(camera => camera.ipaddress === ipaddress);
    return cam || [];
    //  return ( cam ) ? this.cameras : false;
  }


  updateCamera(cam: ICamera): Promise<ICamera> {

    return this.storage.get(CAMERA_STORAGE).then((res: ICamera[]) => {

      if (!res || res.length === 0) { return null; }
      // tslint:disable-next-line: prefer-const
      let newCams: ICamera[] = [];

      // tslint:disable-next-line: prefer-const
      for (let i of res) {
        if (i.id === cam.id) {

          newCams.push(cam);
        } else {
          newCams.push(i);
        }
      }
      return this.storage.set(CAMERA_STORAGE, newCams);
    });


  }



  deleteCamera(ipaddress) {
    const ArrayCam = this.cameras.filter(res => res.ipaddress !== ipaddress);
    this.storage.set(CAMERA_STORAGE, ArrayCam);
  }

}
