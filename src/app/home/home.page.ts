import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
// plugins nativos
import { Vibration } from '@ionic-native/vibration/ngx';
// Services
import { OverlayService } from './../services/overlay.service';
import { ApicamService } from './../services/apicam.service';
import { CamerasService } from 'src/app/services/cameras.service';
// Models
import { ICamera } from 'src/app/models/camera.model';
// Components
import { ConfigmodalComponent } from './../components/configmodal/configmodal.component';
import { PopoverComponent } from './../components/popover/popover.component';
import { AddcameraComponent } from '../components/addcamera/addcamera.component';
// Rxjs
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private reload$: Subject<void> = new Subject();
  public selectedCamera: ICamera;
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
  public notfoundcam = 'Por favor adicione uma câmera.';
  public startTime: number;
  public pointerTimeout;

  constructor(
    private modalCtrl: ModalController,
    private overlayService: OverlayService,
    private popoverCtrl: PopoverController,
    private camerasService: CamerasService,
    private apiCamService: ApicamService,
    private vibration: Vibration
  ) { }

  ngOnInit() {
    this.reload$
      .pipe(
        startWith([])
      )
      .subscribe(_ => {
        this.camerasService.getAllCamera().then((res) => {
          this.cams = res || [];
        });
      });
  }

  public action(act: string): void {
    if (!this.selectedCamera) {
      this.errorSelectCamera();
      return;
    }
    // TODO: vibrar
    this.vibrationStart(100);
    this.apiCamService.action(this.selectedCamera, act).toPromise();
  }

  private errorSelectCamera(): void {
    this.overlayService.toast({ message: `Selecione uma câmera!` });
  }

  public changeCam(ev: any) {
    // Selecionar Camera
    this.selectedCamera = ev.detail.value;
    this.overlayService.toast({ message: `Câmera selecionada! IP: <strong> ${this.selectedCamera.name}</strong>` });
  }

  public async addCamera(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddcameraComponent,
      backdropDismiss: false
    });

    modal.onDidDismiss().then(_ => {
      this.reload$.next();
    });

    modal.present();
  }

  public async openConfig(): Promise<void> {
    if (!this.selectedCamera) {
      this.errorSelectCamera();
      return;
    }

    const modal = await this.modalCtrl.create({
      component: ConfigmodalComponent
    });
    modal.present();
  }

  public async openPopover(): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
    });
    popover.present();
  }

  public presetStart(): void {

    if (!this.selectedCamera) {
      this.errorSelectCamera();
      return;
    }
    this.startTime = new Date().getTime();

  }

  public  presetEnd(preset: number): Promise<void> {
    if (!this.selectedCamera) {
      return;
    }

    const calcTime = new Date().getTime() - this.startTime;

    if (calcTime >= 1000) {
      this.presetLongPress(preset);
    }
    else {
      this.presetShortPress(preset);
    }
  }

  private async presetLongPress(preset: number): Promise<void> {
    const modal = await this.overlayService.alert({
      header: 'PTZ Controller',
      message: `Deseja salvar Preset : ${preset}`,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.savePreset(preset);
          }
        }
      ]
    });
    return modal.present();
  }

  private presetShortPress(preset: number): void {
    // TODO: vibrar
    this.vibrationStart(100);
    this.apiCamService.gotoPreset(this.selectedCamera, preset).toPromise().then(_ => {
      this.overlayService.toast({ message: `Preset <strong>${preset}</strong>` });
    });
  }

  private savePreset(preset: number): void {
    // TODO: vibrar
    this.vibrationStart(1000);
    this.apiCamService.savePreset(this.selectedCamera, preset).toPromise().then(_ => {
      this.overlayService.toast({ message: `Preset salvo! <strong>${preset}</strong>` });
    });
  }

  private vibrationStart(time?: number): void {
    this.vibration.vibrate(time);
  }

}
