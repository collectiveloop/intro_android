import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../lib/config.service';
import { SessionService } from '../lib/session.service';
import { SettingsProvider } from '../lib/settings';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/login/reset_password';
import { UpdateUserPage } from '../pages/user/user_update';
import { SettingUserPage } from '../pages/user/user_setting';
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html',
  providers: [SettingsProvider, Deeplinks]
})

export class MyApp {
  @ViewChild('rootNavController') nav: NavController;
  rootPage: any = LoginPage;
  selectedTheme: String;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, private globalization: Globalization, public configService: ConfigService, private sessionService: SessionService, private app: App, public menuCtrl: MenuController, private settings: SettingsProvider, private deeplinks: Deeplinks) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.platform.ready().then(() => {
      //Language
      if (this.platform.is('cordova')) {
        this.globalization.getPreferredLanguage().then(result => {
          let language = result.value.split('-')[0];//evitamos cosas como -US
          this.translateService.setDefaultLang(language);

          this.deeplinks.routeWithNavController(this.app.getRootNav(), {
            '/api/public/remember-link/:token': ResetPasswordPage,
            '/forgot-password/:token': ResetPasswordPage
          }).subscribe((match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log('Successfully matched route', match);
          }, (nomatch) => {
            // nomatch.$link - the full link data
            console.error('Got a deeplink that didn\'t match', nomatch);
          });

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

  public settingUser(): void {
    console.log("setting");
    this.menuCtrl.close();
    this.app.getRootNav().push(SettingUserPage);
  }

  public closeSession(): void {
    this.menuCtrl.close();
    this.sessionService.closeSession();
    this.app.getRootNav().popToRoot();
  }

  public runDevice(): void {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    //this.statusBar.styleDefault();
    if (this.platform.is('ios'))
      this.settings.setActiveTheme('ios-theme');
    else
      this.settings.setActiveTheme('android-theme');
    this.statusBar.styleBlackOpaque();
    this.splashScreen.hide();
  }
}
