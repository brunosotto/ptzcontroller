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

    deleteCam(ipaddress) {
    this.reload$.pipe(startWith([null])).subscribe(_ => {
      this.camerasService.deleteCamera(ipaddress);
      this.camerasService.getAllCamera().then((res: any) => {
        return this.cams = res;
      });
    });
  }

    closeModal(cam: ICamera): void {
        this.modalCtrl.dismiss(cam);
  }

}
