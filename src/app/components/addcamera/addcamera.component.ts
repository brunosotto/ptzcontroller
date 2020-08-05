import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CamerasService } from 'src/app/services/cameras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ICamera } from 'src/app/models/camera.model';

@Component({
  selector: 'app-addcamera',
  templateUrl: './addcamera.component.html',
  styleUrls: ['./addcamera.component.scss'],
})
export class AddcameraComponent implements OnInit, OnDestroy {

public form: FormGroup;

 public cams: ICamera[];

  constructor(
    private modalCtrl: ModalController,
    private camerasService: CamerasService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.camerasService.getAllCamera().then((res: ICamera[]) => this.cams = res);
  }

  initForm(): void {
    const id =  Date.now();
    this.form = this.fb.group({
      name: ['', Validators.required],
      ipaddress: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      description: ['']
    });
  }

  add(): void{
    try {
      console.log(this.form.value);
      const data = this.form.value;
      this.camerasService.addCamera(data);
      this.form.reset();
    } catch (error) {
      console.log('ERrroroororor' , error);
    }
   }

    closeModal(){
    return this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {

  }
}
