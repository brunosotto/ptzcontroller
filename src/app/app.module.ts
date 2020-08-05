
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { IonicGestureConfig } from './gestures/ionic-gesture-config';
import { LongPressDirective } from './directives/longpress.directive';
@NgModule({
  declarations: [AppComponent, LongPressDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // HammerModule,
    IonicStorageModule.forRoot({
      name: '__ptzdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }),
    SharedModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    HttpClient,
    LongPressDirective,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
