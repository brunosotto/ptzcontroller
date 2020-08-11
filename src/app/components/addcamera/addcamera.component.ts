import { OverlayService } from './../../services/overlay.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CamerasService } from 'src/app/services/cameras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICamera } from 'src/app/models/camera.model';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-addcamera',
  templateUrl: './addcamera.component.html',
  styleUrls: ['./addcamera.component.scss'],
})
export class AddcameraComponent implements OnInit {

  private reloadList$: Subject<void> = new Subject();
  public form: FormGroup;
  public cams: ICamera[];

  constructor(
    private modalCtrl: ModalController,
    private camerasService: CamerasService,
    private fb: FormBuilder,
    private overlayService: OverlayService) { }

  ngOnInit() {
    this.initForm();

    this.reloadList$
      .pipe(
        startWith([])
      )
      .subscribe(_ => {
        this.camerasService.getAllCamera().then((res) => {
          this.cams = res || [];
        });
      });
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      ipaddress: [null, Validators.required],
      user: [null, Validators.required],
      password: [null, Validators.required],
      description: null
    });
  }

  private get id(): number {
    return new Date().getTime();
  }

  private showLoad(): Promise<HTMLIonLoadingElement> {
    return this.overlayService.loading({ message: 'Aguarde...' });
  }

  public async submit(): Promise<void> {
    const id = this.form.get('id').value;
    const load = await this.showLoad();
    const cam = this.form.value as ICamera;

    if (!id) {
      cam.id = this.id;
      this.camerasService.addCamera(cam).then(() => {
        this.overlayService.toast({ message: `${cam.name}  Adicionada com sucesso!` });
        this.reloadList$.next();
        load.dismiss();
      });
    } else {
      this.camerasService.updateCamera(cam).then(() => {
        this.overlayService.toast({ message: `${cam.name}  Atualizado com sucesso!` });
        this.reloadList$.next();
        load.dismiss();
      });
    }
    this.form.reset();
  }

  public editCam(cam: ICamera): void {
    this.form.setValue(cam);
  }

  public async deleteCam(id: number, confirm?: boolean): Promise<void> {
    if (!confirm) {
      this.overlayService.alert({
        header: 'PTZ Controle',
        message: `Deseja deletar Câmera ${id} ?`,
        buttons: [
          {
            text: 'Não',
            role: 'cancel'
          },
          {
            text: 'Sim',
            role: 'confirm',
            handler: () => {
              this.deleteCam(id, true);
            }
          }
        ]
      });

      return;
    }

    const load = await this.showLoad();
    this.camerasService.deleteCamera(id).then(_ => {
      this.overlayService.toast({ message: 'Deletado com sucesso!' });
      this.reloadList$.next();
      load.dismiss();
    });
  }

  public closeModal(): void {
    this.modalCtrl.dismiss();
  }

}
