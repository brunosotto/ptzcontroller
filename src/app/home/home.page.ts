import { ApicamService } from './../services/apicam.service';
import { ICamera } from 'src/app/models/camera.model';
import { CamerasService } from 'src/app/services/cameras.service';
import { Component, OnInit, ElementRef, NgZone, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ModalController, PopoverController, GestureController, Gesture } from '@ionic/angular';
import { OverlayService } from './../services/overlay.service';
import { ConfigmodalComponent } from './../components/configmodal/configmodal.component';
import { PopoverComponent } from './../components/popover/popover.component';
import { AddcameraComponent } from '../components/addcamera/addcamera.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

@ViewChildren('movUpBtn', {read: ElementRef }) movUpBtn: QueryList<ElementRef>;

  cameraSelected = {};
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
  // longPressActive = false;
  public progress = 0;
  public pressState = 'released';
  delay =  1500;
  action: any; // not stacking actions
  private longPressActive = false;
//  not function
  protected interval: any;
  constructor(
    private modalCtrl: ModalController,
    private overlayService: OverlayService,
    private popoverCtrl: PopoverController,
    private camerasService: CamerasService,
    private apiCamService: ApicamService,
    private gestureCtrl: GestureController,
    private el: ElementRef,
    private zone: NgZone
    ) { }

  ngOnInit() {
    this.camerasService.getAllCamera().then( async (res) => {
      if (res){
         this.cams =  await res;
         console.log('Res ', res);
      }
    });
  }
 ngAfterViewInit() {
   const fbArray = this.movUpBtn.toArray();
   this.loadLongPressOnElement(fbArray);
    }
    // Gesture Press Ainda nao esta funcionando...
    loadLongPressOnElement(fabbtuton) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < fabbtuton.length; i++){
          const fabbtn = fabbtuton[i];
          const gesture = this.gestureCtrl.create({
            el: fabbtn.nativeElement,
            gestureName: 'long-press',
            onStart: ev => {
                this.longPressActive = true;
                this.longPressAction(i);
            },
            onEnd: ev => {
                this.longPressActive = false;
            }
        });
          gesture.enable(true);

        }
    }

    longPressAction(i) {
      console.log('Testando.....');
      setTimeout(() => {
        if (this.longPressActive === true)  {
           this.zone.run(() => {
            this.longPressAction(i);
          });
        }
      }, 50);
    }

  //  Presets Btn
  async presetBtn(ev: number) {
  const toast = await this.overlayService.toast({ message: `Preset : ${ev}`});
  toast.prepend();
  console.log(ev);
  }

  // Move Setas

  movUp($event): void {

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
  }
  movUpStop(): void {
    console.log('Stop');
  }
  movUpPress($event){
    console.log($event);
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
    this.cameraSelected = cam;
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


    //  Usando HammerJS Funcoes
     onPress($event) {
        console.log('onPress', $event);
        this.pressState = 'pressing';
        this.startInterval();
        // console.log(this.startInterval());
    }

    onPressUp($event) {
        console.log('onPressUp', $event);
        this.pressState = 'released';
        this.stopInterval();
    }

    startInterval() {
        const self = this;
        // tslint:disable-next-line: only-arrow-functions
        this.interval = setInterval(function() {
            self.progress = self.progress + 1;
            console.log(self.progress);
        }, 50);
    }

    stopInterval() {
        clearInterval(this.interval);
    }
}
