import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-configmodal',
  templateUrl: './configmodal.component.html',
  styleUrls: ['./configmodal.component.scss'],
})
export class ConfigmodalComponent implements OnInit {

  dataSettingsDefaut = { brightness: 50, saturation: 128, contrast: 50, exposure: 64 };
  dataSettings = { brightness: 0, saturation: 0, contrast: 0, exposure: 0  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  rangerBright(ev: any) {
    const ranger = ev.detail.value;
    this.dataSettings.brightness = ranger;
    console.log('Brightness > ', ranger);
  }
  rangerContrast(ev: any){
    const ranger = ev.detail.value;
    this.dataSettings.contrast = ranger;
    console.log('Contrast > ', ranger);
  }
  rangeSaturation(ev: any){
    const ranger = ev.detail.value;
    this.dataSettings.saturation = ranger;
    console.log('Saturation > ', ranger);
  }

  rangerExposure(ev: any) {
    const ranger = ev.detail.value;
    this.dataSettings.exposure = ranger;
    console.log('Exposure > ', ranger);
  }

  closeModalPassData() {
    console.log(this.dataSettings)
    return this.modalCtrl.dismiss({
      data: this.dataSettings
    });
  }

  closeModal() {
    return this.modalCtrl.dismiss();
  }
  apply(){}
}