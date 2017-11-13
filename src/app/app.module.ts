import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LinkedIn } from '@ionic-native/linkedin';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DatePicker } from '@ionic-native/date-picker';
import { Contacts } from '@ionic-native/contacts';

import { IonicStorageModule  } from '@ionic/storage';

import { ConfigService }   from '../lib/config.service';
import { MessageService } from '../lib/messages.service';
import { UtilService }   from '../lib/utils.service';
import { NavigationService }   from '../lib/navigation.service';
import { HttpService }    from '../lib/http.service';
import { SessionService }   from '../lib/session.service';
import { ContactService } from '../lib/contacts.service';
import { TabService } from '../pages/tabs/tabs.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/dashboard/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/login/forgot_password';
import { ResetPasswordPage } from '../pages/login/reset_password';
import { ChangePasswordPage } from '../pages/login/change_password';
import { RegisterUserPage } from '../pages/user/user_register';
import { ProfileUserPage } from '../pages/user/user_profile';

import { ListContactsPage } from '../pages/contacts/list_contacts';
import { PickContactsPage } from '../pages/contacts/pick_contacts';
import { ProfileContactsPage } from '../pages/contacts/profile_contact';
import { AddContactsPage } from '../pages/contacts/add_contacts';

import { SearchContactsPage } from '../pages/contacts/search_contacts';
import { ListContactsPendingPage } from '../pages/contacts/list_contacts_pending';
import { ListMessagesPage } from '../pages/messages/list_messages';
import { ListIntrosPage } from '../pages/intros/list_intros';
import { AddIntrosPage } from '../pages/intros/add_intros';
import { FormIntrosPage } from '../pages/intros/form_intros';
import { FinalIntrosPage } from '../pages/intros/final_intros';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ChangePasswordPage,
    RegisterUserPage,
    ProfileUserPage,
    ListContactsPendingPage,
    ListContactsPage,
    PickContactsPage,
    ProfileContactsPage,
    AddContactsPage,
    SearchContactsPage,
    ListMessagesPage,
    ListIntrosPage,
    AddIntrosPage,
    FormIntrosPage,
    FinalIntrosPage,
    HomePage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement: 'bottom',
      scrollAssist: true,
      autoFocusAssist: false,
      scrollPadding: false,
      platforms:{
        android:{tabsPlacement: 'bottom'},
        ios:{tabsPlacement: 'bottom'},
        windows:{tabsPlacement: 'bottom'}
      }
    }),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps:[Http]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ChangePasswordPage,
    RegisterUserPage,
    ProfileUserPage,
    ListContactsPendingPage,
    ListContactsPage,
    PickContactsPage,
    ProfileContactsPage,
    AddContactsPage,
    SearchContactsPage,
    ListMessagesPage,
    ListIntrosPage,
    AddIntrosPage,
    FormIntrosPage,
    FinalIntrosPage,
    HomePage,
    TabsPage
  ],
  providers: [
    ConfigService,
    MessageService,
    TabService,
    UtilService,
    NavigationService,
    HttpService,
    SessionService,
    ContactService,
    StatusBar,
    SplashScreen,
    Globalization,
    Facebook,
    GooglePlus,
    LinkedIn,
    LocalNotifications,
    DatePicker,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
//para el translate
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
