import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ICamera } from './../models/camera.model';

const CAMERA_STORAGE = 'cameras';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  public cameras: ICamera[] = [];

  constructor(
    private storage: Storage,
  ) {

  }

  public addCamera(camera: ICamera): Promise<void> {
    this.cameras.push(camera);
    return this.storage.set(CAMERA_STORAGE, this.cameras);
  }

  public async getAllCamera() {
    const cams = await this.storage.get(CAMERA_STORAGE);
    this.cameras = cams || [];
    return this.cameras;
  }

  public updateCamera(cam: ICamera): Promise<ICamera> {
    // substitui a camera
    this.cameras = this.cameras.map(c => c.id === cam.id ? cam : c);
    return this.storage.set(CAMERA_STORAGE, this.cameras);
  }

  public deleteCamera(id: number): Promise<void> {
    const cams = this.cameras.filter(cam => cam.id !== id);
    return this.storage.set(CAMERA_STORAGE, cams);
  }

}
