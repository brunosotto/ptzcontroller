import { OverlayService } from './../../services/overlay.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CamerasService } from 'src/app/services/cameras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ICamera } from 'src/app/models/camera.model';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-addcamera',
  templateUrl: './addcamera.component.html',
  styleUrls: ['./addcamera.component.scss'],
})
export class AddcameraComponent implements OnInit {

  private reload$ = new Subject();

  public form: FormGroup;

  public cams: ICamera[];

  configs = {
    createNew: true,
    action: 'Salvar',
    actionChange: 'Salvar edição'
  };

  public editIndex = null;
  public clicked = false;
  id = new Date().getTime();
  constructor(
    private modalCtrl: ModalController,
    private camerasService: CamerasService,
    private fb: FormBuilder,
    private overlayService: OverlayService) { }

  ngOnInit() {
    if (!this.id) {
      return;
    }
    this.initForm();

    this.camerasService.getAllCamera().then((res: ICamera[]) => this.cams = res);

  }

  initForm(): void {

    this.form = this.fb.group({
      index: [{ value: null, disabled: true }],
      id: this.id,
      name: ['', Validators.required],
      ipaddress: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      description: ['']
    });
  }

  onAddSubmit(form): void {
    const index = form.getRawValue().index;
    if (index !== null) {
      this.cams[index] = form.value;
      const dataUpdate = this.cams[index];

      this.reload$.pipe(startWith([null])).subscribe(_ => {
        this.camerasService.updateCamera(dataUpdate).then(() => {
        this.overlayService.toast({message: `${dataUpdate.name}  Atualizado com sucesso! `});
      });
      });
    } else {
      const data = this.form.value;
      this.camerasService.addCamera(data);
      console.log('Adicionando com sucesso  ', data);
    }
    this.form.reset();

  }
  onEditSubmit(cam: ICamera, i) {
    this.form.setValue({
      index: i,
      ...cam
    });
  }
 deleteCam(ipaddress) {
   this.overlayService.alert({
     header: 'PTZ Controle',
     message: `Deseja deletar Câmera ${ ipaddress } ?`,
     buttons: [{
       text: 'Não',
       role: 'cancel',
       handler: () => { console.log( 'Cancel');
       }
     }, {
       text: 'Sim',
       role: 'confirm',
       handler: () => {
              this.reload$.pipe(startWith([null])).subscribe(_ => {
                    this.camerasService.deleteCamera(ipaddress);
                    this.camerasService.getAllCamera().then((res: any) => {
                      return this.cams = res;
                    });
                  });
              this.overlayService.toast({message: 'Deletado com sucesso!'});
              this.reload$.next();
       }
     }
     ]
   });
  }



  closeModal(cam?: ICamera): void {
    this.modalCtrl.dismiss(cam);
  }

}
