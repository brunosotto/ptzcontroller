import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configmodal',
  templateUrl: './configmodal.component.html',
  styleUrls: ['./configmodal.component.scss'],
})
export class ConfigmodalComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  rangerColor(ev: any){
    console.log(ev)
  }
}
