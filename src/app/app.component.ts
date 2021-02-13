import { Storage } from '@ionic/storage';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

const CAMERA_STORAGE = 'cameras';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private renderer: Renderer2
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();

      this.storage.ready().then(() => {
        this.splashScreen.hide();
      }).catch(e => console.log('Erro ao ler banco'));
    });
  }

 async ngOnInit() {
    // se status.darkmode = true aplica darktheme se nao aplica light theme
    const status = await JSON.parse(this.getConfDarkmode());
    status.darkmode ? this.renderer.setAttribute(document.body, 'color-theme', 'dark')
    : this.renderer.setAttribute(document.body, 'color-theme', 'light');
  }

// retorno um objeto {darkmode: true} ou {darkmode: false}
private getConfDarkmode(): any {
    return localStorage.getItem('darkmode');
  }
}
