import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CamerasService } from 'src/app/services/cameras.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcamera',
  templateUrl: './addcamera.component.html',
  styleUrls: ['./addcamera.component.scss'],
})
export class AddcameraComponent implements OnInit {

public form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private camerasService: CamerasService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      ipaddress: ['', Validators.required],
      description: ['']
    });
  }

  add(){
    try {
      console.log(this.form.value);
      const data = this.form.value;
      this.camerasService.addCamera(data).then((res) => {
      console.log('Add com sucesso ->  ', res);
      this.modalCtrl.dismiss();
    }).catch(e => console.log('Erro ao add camera', e));
    } catch (error) {
      console.log('ERrroroororor' , error);
    }
   }



  closeModal(){
    return this.modalCtrl.dismiss();
  }

}
