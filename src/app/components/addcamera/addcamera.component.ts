import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CamerasService } from 'src/app/services/cameras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 

import { ICamera } from 'src/app/models/camera.model';

@Component({
  selector: 'app-addcamera',
  templateUrl: './addcamera.component.html',
  styleUrls: ['./addcamera.component.scss'],
})
export class AddcameraComponent implements OnInit {

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
    const id =  Math.floor(100 + Math.random() * 900);
    this.form = this.fb.group({
      id:  [id],
      name: ['', Validators.required],
      ipaddress: ['', Validators.required],
      description: ['']
    });
  }

  add(){
    try {
      console.log(this.form.value);
      const data = this.form.value;
      this.camerasService.addCamera(data);
    } catch (error) {
      console.log('ERrroroororor' , error);
    }
   }

  
  closeModal(){
    return this.modalCtrl.dismiss();
  }

}
