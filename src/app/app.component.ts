import { Storage } from '@ionic/storage';
import { ICamera } from 'src/app/models/camera.model';
import { CamerasService } from 'src/app/services/cameras.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

const CAMERA_STORAGE = 'cameras';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  private reload$ = new Subject();
  cameras: ICamera[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private screenOrientation: ScreenOrientation,
    private camerasService: CamerasService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.readyBdStorage();

      // if (this.platform.is('cordova')) {
      //   // forçar screen orientation Landscape
      //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      // }

      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();

    });
  }

  ngOnInit() {
    this.reload$.pipe(startWith([null])).subscribe(_ => {
      this.camerasService.getAllCamera().then((res) => {
        if (res) {
          this.cameras = res;
        }
      });
    });
  }

  readyBdStorage(): void {
    this.storage.ready().then(() => {
      console.log('Lendo banco local');
    }).catch(e => console.log('Erro ao ler banco'));
  }

}
