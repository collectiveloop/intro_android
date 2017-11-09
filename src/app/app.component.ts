import { Component, ViewChild, NgZone } from '@angular/core';
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
import { ListContactsPendingPage } from '../pages/contacts/list_contacts_pending';
import { ChangePasswordPage } from '../pages/login/change_password';
import { ProfileUserPage } from '../pages/user/user_profile';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactService } from '../lib/contacts.service';

@Component({
  templateUrl: 'app.html',
  providers: [SettingsProvider]
})



export class MyApp {
  @ViewChild('rootNavController') nav: NavController;
  rootPage: any = LoginPage;
  selectedTheme: String;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, private globalization: Globalization, public configService: ConfigService, private sessionService: SessionService, private app: App, public menuCtrl: MenuController, private settings: SettingsProvider, public contacts: ContactService, private ngZone: NgZone) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.sessionService.setDestinySession(TabsPage,{});
    // override open handler to navigate on further custom url scheme actions
    if (typeof  window['handleOpenURL'] !== 'undefined') {
      (window as any).handleOpenURL = (url) => {
         // this context is called outside of angular zone!
         setTimeout(() => {
           // so we need to get back into the zone..
           this.ngZone.run(() => {
              // this is in the zone again..
              this.handleOpenURL(url);
           });
         }, 0);
       };
    }

    //cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=key_live_ndqptlgXNE4LHqIahH1WIpbiyFlb62J3 --variable URI_SCHEME=introapp
    this.platform.ready().then(() => {
      //Language
      if (this.platform.is('cordova')) {
        this.globalization.getPreferredLanguage().then(result => {
          let language = result.value.split('-')[0];//evitamos cosas como -US
          this.translateService.setDefaultLang(language);
          this.contacts.getContacts();
          this.checkHandleURL();
          // check if app was opened by custom url scheme
          this.platform.resume.subscribe(() => {
            this.execHandleURL();
          });
          this.runDevice();
        });
      } else {
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
    this.sessionService.setIgnoreSession(false);
  }

  public checkHandleURL():void{
    const lastUrl: string = (window as any).handleOpenURL_LastURL || '';
    if (lastUrl && lastUrl !== '') {
      delete (window as any).handleOpenURL_LastURL;
      this.handleOpenURL(lastUrl);
    }
  }

  public execHandleURL():void{
    this.checkHandleURL();
    let destiny = this.sessionService.getDestinySession();
    if(destiny.target!==undefined && destiny.target!==null)
      this.app.getRootNav().push(destiny.target,destiny.params);
  }

  public handleOpenURL(url) {
    console.log('received url: ' + url);
    if (url!=='') {
      this.sessionService.setIgnoreSession(true);
      if(url.indexOf('intros')!==-1 || url.indexOf('intros-link')!==-1){
        this.sessionService.setDestinySession(TabsPage,{});
      }else{
        if(url.indexOf('invitation-contact')!==-1 || url.indexOf('invitations-link')!==-1){
          this.sessionService.setDestinySession(TabsPage,{section:ListContactsPendingPage,index:1});//el index es para el tab
        }else{
          let verify = '/remember-link/';
          let token:number;
          token = url.indexOf(verify);
          if(token===-1){
            verify = '/forgot-password/';
            token = url.indexOf(verify);
          }
          if(token!==-1){
            this.sessionService.setDestinySession(ResetPasswordPage,{token:url.substring(token+verify.length,url.length)});
          }
        }
      }
    }
  }
}
