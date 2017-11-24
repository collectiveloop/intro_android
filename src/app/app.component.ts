import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, App } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../lib/config.service';
import { SessionService } from '../lib/session.service';
import { NavigationService } from '../lib/navigation.service';
import { HttpService } from '../lib/http.service';
import { SettingsProvider } from '../lib/settings';
import { ContactService } from '../lib/contacts.service';
import { TimeService } from '../lib/time.service';
import { PushNotificationService } from '../lib/pushNotification.service';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/login/reset_password';
import { ListContactsPendingPage } from '../pages/contacts/list_contacts_pending';
import { ChangePasswordPage } from '../pages/login/change_password';
import { ProfileUserPage } from '../pages/user/user_profile';
import { FormContactUsPage } from '../pages/contact_us/form_contact_us';
import { ChatMessagesPage } from '../pages/messages/chat_messages';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html',
  providers: [SettingsProvider]
})

export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage: any;
  selectedTheme: String;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, private globalization: Globalization, public configService: ConfigService, public sessionService: SessionService, private app: App, public menuCtrl: MenuController, private settings: SettingsProvider, public contacts: ContactService, private httpService: HttpService, public timeService: TimeService, public pushNotificationService: PushNotificationService, public navigationService:NavigationService) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.platform.ready().then(() => {
      this.httpService.setLogin(LoginPage);
      //Language
      if (this.platform.is('cordova')) {
        this.globalization.getPreferredLanguage().then(result => {
          let language = result.value.split('-')[0];//evitamos cosas como -US
          this.translateService.setDefaultLang(language);
          this.contacts.getContacts();
          this.pushNotifications();
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
    this.menuCtrl.close();
    this.app.getRootNav().push(ProfileUserPage);
  }

  public contactUs(): void {
    this.menuCtrl.close();
    this.app.getRootNav().push(FormContactUsPage);
  }

  public termsConditions(): void {
    this.menuCtrl.close();
    this.navigationService.navigateExternal({
        'url': this.configService.getDomainAPI()+'/terms-conditions/'+this.translateService.getDefaultLang(),
        'target':'_blank'
    });
  }

  public politicsPrivacies(): void {
    this.menuCtrl.close();
    this.navigationService.navigateExternal({
        'url': this.configService.getDomainAPI()+'/politics-privacy/'+this.translateService.getDefaultLang(),
        'target':'_blank'
    });
  }

  public closeSession(): void {
    this.menuCtrl.close();
    this.sessionService.closeSession();
    this.app.getRootNav().setRoot(LoginPage);
  }

  public runDevice(): void {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    if (this.platform.is('ios')) {
      this.settings.setActiveTheme('ios-theme');
      this.statusBar.styleDefault();
    } else {
      this.settings.setActiveTheme('android-theme');
      this.statusBar.styleBlackOpaque();
    }
    this.splashScreen.hide();
    this.branchInit();
    this.loadPage(false);
    // Branch initialization
    this.platform.resume.subscribe(() => {
      this.branchInit();
      this.loadPage(true);
    });
  }

  // Branch initialization
  public branchInit(): void {
    // only on devices
    if (!this.platform.is('cordova')) {
      return;
    }
    const Branch = window['Branch'];
    Branch.initSession(data => {
      let link: string = '';
      if (data['+clicked_branch_link'] !== undefined && data['+clicked_branch_link'] !== null && data['+clicked_branch_link'] !== false) {
        link = data['+clicked_branch_link'];
      } else {
        if (data['+non_branch_link'] !== undefined && data['+non_branch_link'] !== null && data['+non_branch_link'] !== false)
          link = data['+non_branch_link'];
      }
      console.log(link);
      if (link !== '') {
        if (link.indexOf('intros') !== -1 || link.indexOf('intros-link') !== -1) {
          this.sessionService.setDestinySession(TabsPage, {});
        } else {
          if (link.indexOf('invitation-contact') !== -1 || link.indexOf('invitations-link') !== -1) {
            this.sessionService.setDestinySession(TabsPage, { section: ListContactsPendingPage, index: 1 });//el index es para el tab
          } else {
            let verify = '/remember-link/';
            let token: number;
            token = link.indexOf(verify);
            if (token === -1) {
              verify = '/forgot-password/';
              token = link.indexOf(verify);
            }

            if (token !== -1) {
              this.sessionService.setDestinySession(ResetPasswordPage, { token: link.substring(token + verify.length, link.length) });
            }
          }
        }
      }
    });
  }

  public pushNotifications(): void {
    this.pushNotificationService.init({
      received: (data) => {
        // do something when notification is received
        console.log(data);
        let view = this.app.getRootNav().getActive();
        if(view ===undefined || view.instance === undefined || !(view.instance instanceof ChatMessagesPage)){
          let params = [];
          this.timeService.cancelAll();
          if (data.payload.additionalData.tabsIndex !== undefined) {
            params['index'] = data.payload.additionalData.tabsIndex;
            params['section'] = '';
          }

          if (data.payload.additionalData.introId !== undefined)
            params['introId'] = data.payload.additionalData.introId;

          this.sessionService.setDestinySession(TabsPage, params);
          this.sessionService.setIgnoreSession(false);
        }
      },

      opened: (data) => {
        this.timeService.cancelAll();
        // do something when a notification is opened
        console.log('open', data);
        let view = this.app.getRootNav().getActive();
        if(view ===undefined || view.instance === undefined || !(view.instance instanceof ChatMessagesPage)){
          let params = [];
          if (data.notification.payload.additionalData.tabsIndex !== undefined) {
            params['index'] = data.notification.payload.additionalData.tabsIndex;
            params['section'] = '';
          }

          if (data.notification.payload.additionalData.introId !== undefined)
            params['introId'] = data.notification.payload.additionalData.introId;

          this.sessionService.setDestinySession(TabsPage, params);
          this.sessionService.setIgnoreSession(false);
          if (view !==undefined && view.instance !== undefined && view.instance instanceof TabsPage) {
            this.app.getRootNav().getActive().select(params['index']);
          }
        }
      },
      'focusDisplaying': 'Notification'
    });
  }

  public loadPage(isResume: boolean): void {
    this.sessionService.getSessionStatus().then(function(result) {
      let destiny = this.sessionService.getDestinySession();
      if (result !== false) {
        console.log(destiny);
        if (destiny.target !== undefined && destiny.target !== ResetPasswordPage)
          this.rootPage = destiny.target;
        else
          this.rootPage = TabsPage;
      } else {
        console.log(destiny);
        //RESET PASSWORD O SECCIONES DONDE NO HAY SESION
        if (result === false && destiny.target !== undefined && destiny.target !== null && destiny.target === ResetPasswordPage) {
          this.rootPage = destiny.target;
        } else {
          this.rootPage = LoginPage;
        }
      }

      console.log("este es la rootpage", isResume, this.rootPage);
      if (isResume && this.sessionService.getIgnoreSession() === false) {
        this.sessionService.setIgnoreSession(true);
        this.nav.setRoot(this.rootPage);
      }
    }.bind(this));

  }
}
