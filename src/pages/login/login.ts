import { Component, ViewChild } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LinkedIn } from '@ionic-native/linkedin';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService } from '../../lib/http.service';
import { SessionService } from '../../lib/session.service';
import { TabsPage } from '../tabs/tabs';
import { ProfileUserPage } from '../user/user_profile';
import { RegisterUserPage } from '../user/user_register';
import { ForgotPasswordPage } from '../login/forgot_password';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('user') input;
  @ViewChild('password') password;
  @ViewChild('submit') submit;
  loginForm: FormGroup;
  externalLogin:boolean;
  submitted: boolean;
  errorLogin: string;
  logo: string;
  contactIcon: string;
  facebookLogo: string;
  loader: any;
  loadingMessage: string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public facebook: Facebook, private sessionService: SessionService, private platform: Platform, public messages: MessageService, public googlePlus: GooglePlus, public linkedin: LinkedIn) {
    this.buildValidations();
    this.logo = this.configService.getLogo('BIGGER');
    this.facebookLogo = this.configService.getLogo('FACEBOOK_BUTTON');
    this.sessionService.getSessionStatus().then(function(result) {
      if (result !== false) {
        this.navCtrl.push(TabsPage);
      } else {
        this.translateService.get('LOADING').subscribe(
          value => {
            this.loadingMessage = value;
          }
        );
      }
    }.bind(this));
    this.initElementsByVersion();
  }


  public initElementsByVersion() {
    if (this.platform.is('ios')) {

    } else {

    }
  }

  private buildValidations() {
    this.externalLogin = false;
    this.loginForm = this.formBuilder.group({
      //user: ['renshocontact@gmail.com', Validators.compose([Validators.minLength(5), Validators.required])],
      //password: ['12345678', Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.required])],
      user: ['', Validators.compose( [Validators.minLength(5), Validators.email, Validators.required]) ] ,
      password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(15), Validators.required]) ] 
    });
  }

  public login(): void {
    this.errorLogin = '';
    this.externalLogin = false;
    this.submitted = true;
    let data = {
      email: this.loginForm.value.user.toLowerCase(),
      password: this.loginForm.value.password
    };
    this.messages.showMessage({
      content: this.loadingMessage
    });

    this.httpService.post({
      url: 'login/authenticate',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      inputs: data,
      success: this.callBackLogin,
      context: this,
    });
  }

  private callBackLogin(response: any): void {
    this.messages.closeMessage();
    this.submitted = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorLogin = response.data.message;
    } else {
      this.sessionService.initSession({
        'token': response.data.token,
        'mode_facebook': false,
        'mode_linkedin': false,
        'mode_google_plus': false
      });
      this.httpService.setTokenProvider(response.data.token);
      this.loginForm.reset();
      this.navCtrl.push(TabsPage);
    }
  }

  public handleLogin(action:any):void {
    this[action].setFocus();
  }

  public forgotPassword(): void {
    this.navCtrl.push(ForgotPasswordPage);
  }

  public submitForm(){
    if(this.loginForm.valid)
      this.login();
  }

  public register(): void {
    this.loginForm.reset();
    this.navCtrl.push(RegisterUserPage);
  }

  public loginFacebook(): void {
    this.errorLogin = '';
    this.externalLogin = true;
    this.submitted = true;
    this.sessionService.loginByFacebook().then(function(result) {
      if(result!==false){
        this.getFacebookInfo();
      }else{
        this.submitted = false;
        this.externalLogin = false;
      }
    }.bind(this), function(error) {
      this.errorLogin = error;
      this.submitted = false;
      this.externalLogin = false;
      //cerramos sesion en facebook y cerramos sesion en la app
      this.sessionService.closeSession();
    }.bind(this));
  }

  public getFacebookInfo(): void {
    this.messages.showMessage({
      content: this.loadingMessage
    });
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
      .then(data => {
        console.log(data);
        let info = {
          external_id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          platform: 'facebook'
        };

        if(data.id!==undefined)
          info['image_profile'] = 'https://graph.facebook.com/'+data.id+'/picture?width=300&height=300';
        this.httpService.post({
          url: 'user',
          urlParams: [
            'external',
            this.translateService.getDefaultLang()
          ],
          app: this.app,
          inputs: info,
          success: this.callBackFacebook,
          error: this.errorCallBack,
          context: this,
        });
      })
      .catch(error => {
        console.error(error);
        this.submitted = false;
        this.externalLogin = false;
        //cerramos sesion en facebook y cerramos sesion en la app
        this.sessionService.closeSession();
      });
  }

  private errorCallBack(response: any): void {
    this.messages.closeMessage();
    if(response.data!==undefined && response.data.message!==undefined)
      this.errorLogin = response.data.message;
    this.submitted = false;
    this.externalLogin = false;
    //cerramos sesion
    this.sessionService.closeSession();
  }

  private callBackFacebook(response: any): void {
    this.submitted = false;
    this.externalLogin = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorLogin = response.data.message;
      console.log('error', response);
    } else {
      console.log('good', response);
      this.sessionService.initSession({
        'token': response.data.token.token,
        'mode_facebook': true,
        'mode_linkedin': false,
        'mode_google_plus': false
      });
      this.httpService.setTokenProvider(response.data.token.token);
      this.loginForm.reset();
      this.navCtrl.push(ProfileUserPage);
    }
  }

  public loginLinkedin(): void {
    this.errorLogin = '';
    this.submitted = true;
    this.externalLogin = true;
    this.sessionService.loginByLinkedin().then(function(result) {
      if(result!==false){
        this.getLinkedinInfo();
      }else{
        this.submitted = false;
        this.externalLogin = false;
      }
    }.bind(this), function(error) {
      this.errorLogin = error;
      this.submitted = false;
      this.externalLogin = false;
      //cerramos sesion en facebook y cerramos sesion en la app
      this.sessionService.closeSession();
    }.bind(this));
  }

  public getLinkedinInfo(): void {
    this.messages.showMessage({
      content: this.loadingMessage
    });
    //https://api.linkedin.com/v1/people/~:(id,first-name,last-name)
    this.linkedin.getRequest('people/~:(id,first-name,last-name,positions,email-address,picture-url,picture-urls::(original))?format=json')
      .then(data => {
        console.log(data);
        let info = {
          external_id: data.id,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.emailAddress,
          platform: 'linkedin'
        };
        if (data.positions !== undefined && data.positions.values !== undefined && data.positions.values.length > 0) {
          if (data.positions.values[0].company !== undefined && data.positions.values[0].company.name !== undefined)
            info['company_name']= data.positions.values[0].company.name;

          if (data.positions.values[0].title !== undefined)
            info['job_title'] = data.positions.values[0].title;

          if (data.positions.values[0].summary !== undefined)
            info['job_description'] = data.positions.values[0].summary;
        }

        if (data.pictureUrls !== undefined && data.pictureUrls.values !== undefined && data.pictureUrls.values[0] !== undefined)
          info['image_profile'] = data.pictureUrls.values[0];

        this.httpService.post({
          url: 'user',
          urlParams: [
            'external',
            this.translateService.getDefaultLang()
          ],
          app: this.app,
          inputs: info,
          success: this.callBackLikedin,
          error: this.errorCallBack,
          context: this,
        });

      })
      .catch(error => {
        console.error(error);
        this.submitted = false;
        this.externalLogin = false;
        //cerramos sesion en facebook y cerramos sesion en la app
        this.sessionService.closeSession();
      });
  }

  private callBackLikedin(response: any): void {
    this.submitted = false;
    this.externalLogin = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorLogin = response.data.message;
      console.log('error', response);
    } else {
      console.log('good', response);
      this.sessionService.initSession({
        'token': response.data.token.token,
        'mode_facebook': false,
        'mode_linkedin': true,
        'mode_google_plus': false
      });
      this.httpService.setTokenProvider(response.data.token.token);
      this.loginForm.reset();
      this.navCtrl.push(ProfileUserPage);
    }
  }

  public loginGooglePlus(): void {
    this.submitted = true;
    this.externalLogin = true;
    this.errorLogin = '';
    this.sessionService.loginByGooglePlus().then(function(result) {
      if(result!==false){
        let names = result.displayName.split(' ');
        let first_name = '';
        let last_name = '';

        if (names.length > 0)
          first_name = names[0];

        if (names.length > 1)
          last_name = names[1];
        let info = {
          external_id: result.userId,
          first_name: first_name,
          last_name: last_name,
          email: result.email,
          platform: 'google_plus'
        };

        //imagen
        if(result.imageUrl!==undefined && result.imageUrl!==null && result.imageUrl!=='')
          info['image_profile'] = result.imageUrl;

        this.messages.showMessage({
          content: this.loadingMessage
        });
        this.httpService.post({
          url: 'user',
          urlParams: [
            'external',
            this.translateService.getDefaultLang()
          ],
          app: this.app,
          inputs: info,
          success: this.callBackGooglePlus,
          error: this.errorCallBack,
          context: this,
        });
      }else{
        this.submitted = false;
        this.externalLogin = false;
      }

    }.bind(this), function(error) {
      this.errorLogin = error;
      this.submitted = false;
      //cerramos sesion en facebook y cerramos sesion en la app
      this.sessionService.closeSession();
    }.bind(this));
  }

  public callBackGooglePlus(response: any): void {
    this.submitted = false;
    this.externalLogin = false;
    this.messages.closeMessage();
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorLogin = response.data.message;
      console.log('error', response);
    } else {
      console.log('good', response);
      this.sessionService.initSession({
        'token': response.data.token.token,
        'mode_facebook': false,
        'mode_linkedin': false,
        'mode_google_plus': true
      });
      this.httpService.setTokenProvider(response.data.token.token);
      this.loginForm.reset();
      this.navCtrl.push(ProfileUserPage);
    }
  }
}
