import { ICamera } from 'src/app/models/camera.model';
import { CamerasService } from 'src/app/services/cameras.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { OverlayService } from './../services/overlay.service';
import { ConfigmodalComponent } from './../components/configmodal/configmodal.component';
import { PopoverComponent } from './../components/popover/popover.component';
import { AddcameraComponent } from '../components/addcamera/addcamera.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public btnsPresets: Array<any> = [
    {number: 1 },
    {number: 2 },
    {number: 3 },
    {number: 4 },
    {number: 5 },
    {number: 6 },
    {number: 7 },
    {number: 8 },
    {number: 9 },
    {number: 10 },

  ];
  public cams: Array<ICamera>;

  constructor(
    private modalCtrl: ModalController,
    private overlayService: OverlayService,
    private popoverCtrl: PopoverController,
    private camerasService: CamerasService
    ) { }

  ngOnInit() {
    this.camerasService.getAllCamera().then((res) => { 
      
      if(res){
        this.cams = res;
      }

    });
  }

  //  Presets Btn
  async presetBtn(ev: number) {
  const toast = await this.overlayService.toast({ message: `Preset : ${ev}`});
  toast.prepend();
  console.log(ev);
  }

  // Move Setas

  movUp(): void {
    console.log('Movendo UP');
  }
  movLeft(): void {
    console.log('Movendo Esquerda');
  }
   movRight(): void {
    console.log('Movendo Direita');
  }
  movDown(): void {
    console.log('Movendo down');
  }

  // Set Zoom

  zoommIn(): void {
    console.log('Zoom - ');
  }

  zoomOut(): void {
    console.log('Zoom + ');
  }

  // Set Focus
  focusOpen(): void  {
    console.log('Focus Open');
  }

  focusClose(): void  {
    console.log('Focus Closed');
  }

  // Selecionar Camera
  segmentChangedCam(ev: any){
    const cam = ev.detail.value;
    console.log(cam);
  }
  async openConfig() {
    const modal = await this.modalCtrl.create({
      component: ConfigmodalComponent
    });
    return modal.present();
  }
   async openPopover() {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event,
    });
    return popover.present();
  }

public async pressEvent(press: any, preset: number) {
    console.log(press.timeStamp + ' Preset Apretado ' + preset);
    if (press.timeStamp >= 180638600000) {
    const modal = await this.overlayService.alert({
      header: 'PTZ Controller',
      message: `Deseja salvar Preset : ${preset}`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.openSavePreset();
          }
        }
      ]
    });
    return modal.present();
    }
  }

private openSavePreset() {
alert('Chamando Funcao salvar');
}

async addCamera() {
  const modal = await this.modalCtrl.create({
     component: AddcameraComponent
  });
  return modal.present();
}
}
