import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IImageConfig } from 'src/app/models/image.model';
import { ApicamService } from 'src/app/services/apicam.service';
import { Observable, of } from 'rxjs';
import { map, debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';
import { ICamera } from 'src/app/models/camera.model';

@Component({
  selector: 'app-configmodal',
  templateUrl: './configmodal.component.html',
  styleUrls: ['./configmodal.component.scss'],
})
export class ConfigmodalComponent implements OnInit {

  @Input()
  private camera: ICamera;

  private default: IImageConfig = { brightness: 50, saturation: 128, contrast: 50, targety: 64 };
  private oldConfig: IImageConfig;
  public form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private apiCamService: ApicamService,
  ) { }

  ngOnInit() {
    this.initForm();

    this.apiCamService.getImageConfig(this.camera)
      .subscribe(config => {
        this.oldConfig = config;
        this.form.setValue(config);
      });
  }

  private initForm() {
    this.form = this.fb.group({
      brightness: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(100)]],
      contrast: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(100)]],
      saturation: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(255)]],
      targety: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(255)]],
    });

    this.form.valueChanges
      .pipe(
        debounceTime(400),
        distinct(v => JSON.stringify(v)),
      )
      .subscribe((conf: IImageConfig) => {
        this.form.setValue(conf);
        this.submit().toPromise();
      });
  }

  public closeModal() {
    return this.modalCtrl.dismiss();
  }

  public setDefault(): void {
    this.form.setValue(this.default);
  }

  public cancel(): void {
    // retorna a configuração do momento em que abriu a modal
    this.form.setValue(this.oldConfig);
    this.submit().toPromise().then(_ => {
      this.closeModal();
    });
  }

  private submit(): Observable<boolean> {
    if (this.form.invalid) {
      return of(false);
    }

    // envia configurações
    const config = this.form.value as IImageConfig;
    return this.apiCamService.setImageConfig(this.camera, config)
      .pipe(
        map(response => {
          return response.status >= 200 && response.status < 400;
        })
      );
  }
}
