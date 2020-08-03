import { ConfigmodalComponent } from './../configmodal/configmodal.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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

  ]
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  //  Presets Btn

  presetBtn(ev: any) {
    console.log(ev)
  }


  // Move Setas

  movUp(): void {
    console.log("Movendo UP")
  }
  movLeft(): void {
    console.log("Movendo Esquerda")
  }
   movRight(): void {
    console.log("Movendo Direita")
  }
  movDown():void {
    console.log("Movendo down")
  }

  // Set Zoom

  zoommIn(): void {
    console.log("Zoom - ")
  }

  zoomOut(): void {
    console.log("Zoom + ")
  }

  // Set Focus

  focusOpen() :void  {
    console.log("Focus Open")
  }
  

  focusClose() :void  {
    console.log("Focus Closed")
  }

  async openConfig() {
    const modal = await this.modalCtrl.create({
      component: ConfigmodalComponent
    });
    return modal.present();
  }
}
