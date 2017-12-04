import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { AddContactsPage } from './add_contacts';

@Component({
  selector: 'googleplus-contacts',
  templateUrl: 'googleplus_contacts.html'
})
export class GooglePlusContactsPage implements OnInit {
  page: number = 1;
  maxContacts: number = -1;
  quantity: number = 0;
  infiniteScroll: any;
  listContacts: Array<object> = [];
  loadingMessage: string = '';
  notAccessMessage: string = '';
  route: string = '';
  sent: boolean;
  currentChoice: any;
  destiny: string = '';
  api: string = '';

  constructor(private navCtrl: NavController, public app: App, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public navParams: NavParams, public sanitizer: DomSanitizer, public googlePlus: GooglePlus, private storage: Storage, private httpService: HttpService) {
    if (this.navParams.get('destiny') === undefined || this.navParams.get('destiny') === null || this.navParams.get('destiny') === '')
      this.navCtrl.pop();

    this.destiny = this.navParams.get('destiny');
  }

  public ngOnInit(): void {
    this.sent = false;
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.api = this.configService.getGoogleApiKey();
        this.route = this.configService.getDomainImages() + '/profiles/';
        this.page = 1;
        this.initContacts();
      }
    );

    this.translateService.get('NOT_ACCESS').subscribe(
      value => {
        this.notAccessMessage = value;
      }
    );
  }

  public initContacts(): void {
    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.storage.get('mode_google_plus').then(
      function(data) {
        console.log("googleplus");
        console.log(data);
        if (data !== null && data !== undefined && data !== false) {
          //una sesión usando facebook, vemos si hubo sesión
          console.log("normal");
          this.googlePlus.trySilentLogin({})
            .then((result) => {
              console.log(result);
              if (result !== false) {
                this.getContacts();
              }
              this.googlePlus.logout();
            }, function(error) {
              console.error(error);//cuando se cancela

            }.bind(this))
            .catch(error => {
              console.error(error);//cuando se cancela
            });
        } else {
          this.loginByGooglePlus().then((result) => {
            console.log(result);
            if (result !== false) {
              this.getContacts();
            }
          });
          //una sesión tradicional
        }
      }.bind(this)
    );
  }

  public loginByGooglePlus(): any {
    console.log("aqui");
    return new Promise((resolve, reject) => {
      this.googlePlus.logout()
        .then((success) => {
          this.googlePlus.login({})
            .then((result) => {
              resolve(result);
            })
            .catch(error => {
              resolve(false);
            });
        }, (error) => {
          console.log("segundo intento");
          this.googlePlus.login({})
            .then((result) => {
              resolve(result);
            })
            .catch(error => {
              console.error(error);//cuando se cancela
              resolve(false);
            });
        });
    });
  }

  //'https://people.googleapis.com/v1/people/me/connections?key='+this.configService.getGoogleApiKey()
  public getContacts(): void {
    let params = {
      url: 'https://accounts.google.com/o/oauth2/token',
      urlParams: [],
      app: this.app,
      success: this.callBackContact,
      error: this.callBackContactError,
      context: this,
    };

    this.httpService.get(params);

  }

  private callBackContact(response: any): void {
    console.log(response);
    this.googlePlus.logout();
  }

  private callBackContactError(response: any): void {
    console.log(response);
    this.googlePlus.logout();
  }

  private onloadHandler(data): void {
    if (this['image'] !== undefined)
      this['image'].imageLoaded = true;
  }


  public notGranted(): void {
    this.messages.showMessage({
      content: this.notAccessMessage,
      duration: 3000
    });
    this.backAction();
  }

  public backAction(): void {
    /*
    let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
    */
    if (this.destiny === 'add_contacts')
      this.navCtrl.pop(AddContactsPage);
  }

  private refreshScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private disableScroll(): void {
    console.log("disabled");
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  private callBackError(response: any): void {
    this.sent = false;
    this.messages.closeMessage();
  }
}
