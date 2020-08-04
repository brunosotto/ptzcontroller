
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ConfigmodalComponent } from '../components/configmodal/configmodal.component';
import { PopoverComponent } from '../components/popover/popover.component';
import { AddcameraComponent } from '../components/addcamera/addcamera.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConfigmodalComponent, PopoverComponent, AddcameraComponent],
  exports: [
    ConfigmodalComponent,
    PopoverComponent,
    AddcameraComponent,
    FormsModule,
    ReactiveFormsModule
    ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
