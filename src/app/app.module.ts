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
import { OneSignal } from '@ionic-native/onesignal';
import { IonicStorageModule  } from '@ionic/storage';
import { ElasticModule } from 'angular2-elastic';
import { Keyboard } from '@ionic-native/keyboard';
import { Badge } from '@ionic-native/badge';

import { ConfigService }   from '../lib/config.service';
import { MessageService } from '../lib/messages.service';
import { UtilService }   from '../lib/utils.service';
import { NavigationService }   from '../lib/navigation.service';
import { HttpService }    from '../lib/http.service';
import { SessionService }   from '../lib/session.service';
import { ContactService } from '../lib/contacts.service';
import { TimeService } from '../lib/time.service';
import { PushNotificationService } from '../lib/pushNotification.service';
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
import { GooglePlusContactsPage } from '../pages/contacts/googleplus_contacts';
import { PickContactsPage } from '../pages/contacts/pick_contacts';
import { ProfileContactsPage } from '../pages/contacts/profile_contact';
import { AddContactsPage } from '../pages/contacts/add_contacts';
import { SearchContactsPage } from '../pages/contacts/search_contacts';
import { ListContactsPendingPage } from '../pages/contacts/list_contacts_pending';

import { ListIntrosPage } from '../pages/intros/list_intros';
import { AddIntrosPage } from '../pages/intros/add_intros';
import { FormIntrosPage } from '../pages/intros/form_intros';
import { FinalIntrosPage } from '../pages/intros/final_intros';
import { DetailIntrosPage } from '../pages/intros/detail_intros';
import { MadeIntrosPage } from '../pages/intros/made_intros';
import { ReceivedIntrosPage } from '../pages/intros/received_intros';

import { MadeMessagesPage } from '../pages/messages/made_messages';
import { ReceivedMessagesPage } from '../pages/messages/received_messages';
import { ChatMessagesPage } from '../pages/messages/chat_messages';

import { FormContactUsPage } from '../pages/contact_us/form_contact_us';

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
    GooglePlusContactsPage,
    PickContactsPage,
    ProfileContactsPage,
    AddContactsPage,
    SearchContactsPage,
    ListIntrosPage,
    AddIntrosPage,
    FormIntrosPage,
    FinalIntrosPage,
    DetailIntrosPage,
    MadeIntrosPage,
    ReceivedIntrosPage,
    HomePage,
    TabsPage,
    MadeMessagesPage,
    ReceivedMessagesPage,
    ChatMessagesPage,
    FormContactUsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ElasticModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement: 'bottom',
      scrollAssist: true,
      autoFocusAssist: true,
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
    GooglePlusContactsPage,
    PickContactsPage,
    ProfileContactsPage,
    AddContactsPage,
    SearchContactsPage,
    ListIntrosPage,
    AddIntrosPage,
    FormIntrosPage,
    FinalIntrosPage,
    DetailIntrosPage,
    MadeIntrosPage,
    ReceivedIntrosPage,
    HomePage,
    TabsPage,
    MadeMessagesPage,
    ReceivedMessagesPage,
    ChatMessagesPage,
    FormContactUsPage
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
    TimeService,
    PushNotificationService,
    StatusBar,
    SplashScreen,
    Globalization,
    Facebook,
    GooglePlus,
    LinkedIn,
    LocalNotifications,
    DatePicker,
    Contacts,
    OneSignal,
    Keyboard,
    Badge,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
//para el translate
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
