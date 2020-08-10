import { ApicamService } from './../services/apicam.service';
import { ICamera } from 'src/app/models/camera.model';
import { CamerasService } from 'src/app/services/cameras.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, GestureController, Gesture } from '@ionic/angular';
import { OverlayService } from './../services/overlay.service';
import { ConfigmodalComponent } from './../components/configmodal/configmodal.component';
import { PopoverComponent } from './../components/popover/popover.component';
import { AddcameraComponent } from '../components/addcamera/addcamera.component';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private reload$ = new Subject();

  cameraSelected = {};
  public btnsPresets: Array<any> = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 },
    { number: 10 },

  ];
  public cams: Array<ICamera>;
  public notfoundcam = 'Por favor adicione uma câmera.'
  public startTime: number;
  public endTime: number;

  constructor(
    private modalCtrl: ModalController,
    private overlayService: OverlayService,
    private popoverCtrl: PopoverController,
    private camerasService: CamerasService,
    private apiCamService: ApicamService,
  ) { }

  ngOnInit() {

    this.reload$.pipe(startWith([null])).subscribe(_ => {
      this.camerasService.getAllCamera().then((res) => {
        if (res) {
          this.cams = res;
          console.table(res);
        } else {
          this.notfoundcam;
        }
      });
    });
  }


  // Move Setas

  movUp(): void {
    console.log('Start > ');
    /*
        console.log('Movendo UP',  this.cameraSelected);
        // verificar a camera selecionada
        if (this.cameraSelected) {
          // carrega do storage a camera
          this.camerasService.getCamera(this.cameraSelected).then((res: ICamera) => {
          // verifico novamente para ver se tem algo camera
            if (res){
          //  se tiver alguma coisa vou faco o get no service api passando os paremtros
              this.apiCamService.moveUp(res.ipaddress, this.longPressAction($event), res.user, res.password ).subscribe((response) => {
                console.log('enviando mov');
              });
            } else {
              return;
            }
    
          });
        }
        */
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

  zoomIn(): void {
    console.log('Zoom - ');
  }

  zoomOut(): void {
    console.log('Zoom + ');
  }

  // Set Focus
  focusOpen(): void {
    console.log('Focus Open');
  }

  focusClose(): void {
    console.log('Focus Closed');
  }

  // Selecionar Camera
  async segmentChangedCam(ev: any) {
    const cam = ev.detail.value;
    console.log(cam);
    this.cameraSelected = cam;
    await this.overlayService.toast({ message: `Câmera selecionada! IP: <strong> ${cam}</strong>`});
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

  async presetStart(dateStart, preset) {

    this.startTime = new Date().getTime();
    const toast = await this.overlayService.toast({ message: `Preset : ${preset}`,duration: 500 });
    toast.prepend();
    console.log('Date Start', dateStart);
  }

  async presetLongPress(endTime, preset) {

    this.endTime = new Date().getTime();
    endTime = this.endTime;
    const calcTime = endTime - this.startTime;

    if (calcTime >= 1000) {
      const modal = await this.overlayService.alert({
        header: 'PTZ Controller',
        message: `Deseja salvar Preset : ${preset}`,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
            }
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




    if (calcTime > 1000) {
      console.log('Maior que 1000 >   ', calcTime);
    } else {
      console.log('MENOR que 1000 >   ', calcTime);
    }

  }
  private openSavePreset() {
    alert('Chamando Funcao salvar');
  }

  async addCamera() {
    const modal = await this.modalCtrl.create({
      component: AddcameraComponent,
      backdropDismiss: false,
      componentProps: { cam: this.cams }
    });

    modal.dismiss().then(() => {
      this.reload$.next();
    });
    return await modal.present();
  }

  stop(): void {
    console.log('StopEnd  > ');
    setTimeout(() => {
      console.log('Stop');
    }, 0);
  }
}
