import { ICamera } from 'src/app/models/camera.model';
import { CamerasService } from 'src/app/services/cameras.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

cameras: ICamera[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private camerasService: CamerasService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {
        // forçar screen orientation Landscape
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  ngOnInit() {
    this.camerasService.getAllCamera().then(async (res) => {
      this.cameras = await res;
    });
  }
}
