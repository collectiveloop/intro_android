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
import { ChangePasswordPage } from '../pages/login/change_password';
import { ProfileUserPage } from '../pages/user/user_profile';

@Component({
  templateUrl: 'app.html',
  providers: [SettingsProvider]
})

export class MyApp {
  @ViewChild('rootNavController') nav: NavController;
  rootPage: any = LoginPage;
  selectedTheme: String;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, private globalization: Globalization, public configService: ConfigService, private sessionService: SessionService, private app: App, public menuCtrl: MenuController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    //cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3 --variable URI_SCHEME=introapp
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

  public changePassword(): void {
    this.menuCtrl.close();
    this.app.getRootNav().push(ChangePasswordPage);
  }

  public profileUser(): void {
    console.log("setting");
    this.menuCtrl.close();
    this.app.getRootNav().push(ProfileUserPage);
  }

  public closeSession(): void {
    this.menuCtrl.close();
    this.sessionService.closeSession();
    this.app.getRootNav().popToRoot();
  }

  public runDevice(): void {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    if (this.platform.is('ios')){
      this.settings.setActiveTheme('ios-theme');
      this.statusBar.styleDefault();
    } else{
      this.settings.setActiveTheme('android-theme');
      this.statusBar.styleBlackOpaque();
    }
    this.splashScreen.hide();
    this.branchInit();
     // Branch initialization
     this.platform.resume.subscribe(() => {
       console.log("gffgd");
      this.branchInit();
     });
  }

  // Branch initialization
  public branchInit():void {
    // only on devices
    if (!this.platform.is('cordova')) { return }
    const Branch = window['Branch'];
    Branch.initSession(data => {
      console.log(data);
      let link:string ='';
      if(data['+clicked_branch_link']!==undefined && data['+clicked_branch_link']!==null && data['+clicked_branch_link']!==false){
        link = data['+clicked_branch_link'];
      }else{
        if(data['+non_branch_link']!==undefined && data['+non_branch_link']!==null && data['+non_branch_link']!==false)
          link = data['+non_branch_link'];
      }
      //api/public/remember-link/:token: ResetPasswordPage
      ///forgot-password/:token: ResetPasswordPage
      if (link!=='') {
        let verify = '/remember-link/';
        let token:number;
        token = link.indexOf(verify);
        if(token===-1){
          verify = '/forgot-password/';
          token = link.indexOf(verify);
        }

        if(token!==-1)
          this.app.getRootNav().push(ResetPasswordPage,{token:link.substring(token+verify.length,link.length)});
      }
    });
  }
}
