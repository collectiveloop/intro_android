import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../lib/config.service';
import { SessionService }   from '../lib/session.service';

import { LoginPage } from '../pages/login/login';
import { UpdateUserPage } from '../pages/user/user_update';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('rootNavController') nav: NavController;
  rootPage:any = LoginPage;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, private globalization: Globalization, public configService: ConfigService, private sessionService: SessionService, private app: App, public menuCtrl: MenuController) {
    this.platform.ready().then(() => {
      //Language
      if (this.platform.is('cordova')) {
          this.globalization.getPreferredLanguage().then(result => {
          let language = result.value.split('-')[0];//evitamos cosas como -US
          this.translateService.setDefaultLang(language);
          this.runDevice();
  			});
      } else {
        // You're testing in browser, do nothing or mock the plugins' behaviour.
        //
        // var url: string = 'assets/mock-images/image.jpg';
        this.translateService.setDefaultLang(this.configService.getLanguage());
        this.runDevice();
      }
    });
  }

  public updateUser(): void {
    this.menuCtrl.close();
    this.app.getRootNav().push(UpdateUserPage);
  }

  public closeSession(): void {
    this.menuCtrl.close();
    this.sessionService.closeSession();
    this.app.getRootNav().popToRoot();
  }

  public runDevice():void{
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    //this.statusBar.styleDefault();
    this.statusBar.styleBlackOpaque();
    this.splashScreen.hide();
  }
}
