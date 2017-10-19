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
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DatePicker } from '@ionic-native/date-picker';

import { IonicStorageModule  } from '@ionic/storage';

import { ConfigService }   from '../lib/config.service';
import { MessageService } from '../lib/messages.service';
import { UtilService }   from '../lib/utils.service';
import { NavigationService }   from '../lib/navigation.service';
import { HttpService }    from '../lib/http.service';
import { SessionService }   from '../lib/session.service';

import { MyApp } from './app.component';
import { TabService } from '../pages/tabs/tabs.service';
import { HeaderComponent } from '../pages/header/header';
import { HomePage } from '../pages/dashboard/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterUserPage } from '../pages/user/user_register';
import { SettingUserPage } from '../pages/user/user_setting';
import { UpdateUserPage } from '../pages/user/user_update';

@NgModule({
  declarations: [
    MyApp,
    HeaderComponent,
    LoginPage,
    RegisterUserPage,
    SettingUserPage,
    UpdateUserPage,
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
    HeaderComponent,
    LoginPage,
    RegisterUserPage,
    SettingUserPage,
    UpdateUserPage,
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
    StatusBar,
    SplashScreen,
    Globalization,
    Facebook,
    GooglePlus,
    LinkedIn,
    Camera,
    LocalNotifications,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
//para el translate
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
