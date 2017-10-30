import { Component, ViewChild } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { SessionService } from '../../lib/session.service';
import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset_password.html'
})
export class ResetPasswordPage {
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('confirmPassword') confirmPassword;
  resetPasswordForm: FormGroup;
  submitted: boolean = false;
  errorPasswordForm: string;
  logo: string;
  loader: any;
  loadingMessage:string = '';
  token:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public messages: MessageService, public navParams: NavParams, private sessionService: SessionService) {
    this.buildValidations();
    this.token = this.navParams.get('token');
    if(this.token ===undefined || this.token ===null || this.token ==='')
      this.navCtrl.push(LoginPage);
    this.submitted = false;
    console.log(this.token );
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER') ;
      }
    );
  }

  private buildValidations(){
    this.resetPasswordForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.minLength(5), Validators.required]) ],
        password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.required])],
        confirm_password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(15), Validators.required]) ]
    });
  }

  public handleReset(action:any):void {
    this[action].setFocus();
  }

  public submitForm(){
    if(this.resetPasswordForm.valid)
      this.sendRequest();
  }

  public sendRequest():void{
    this.submitted = true;
    this.errorPasswordForm='';

    if(this.resetPasswordForm.value.password!==this.resetPasswordForm.value.confirm_password){
      this.translateService.get('PASSWORD_NOT_MATCH').subscribe(
        value => {
          console.log(value);
          this.errorPasswordForm=value;
        }
      )
      this.submitted = false;
      return;
    }

    let data={
      email : this.resetPasswordForm.value.email.toLowerCase(),
      password : this.resetPasswordForm.value.password,
      token:this.token.replace(/---/g,'/')
    };
    this.messages.showMessage({
       content:this.loadingMessage
    });

    this.httpService.post({
        url:'login/reset-password',
        urlParams:[
          this.translateService.getDefaultLang()
        ],
        app: this.app,
        inputs:data,
        success: this.callBackRequest,
        error: this.callBackError,
        context:this,
    });
  }

  private callBackRequest(response:any):void{
    this.submitted = false;
    this.messages.closeMessage();
    if(response!==undefined && response.status!==undefined && response.status==='error'){
      this.errorPasswordForm = response.data.message;
    }else{
      this.sessionService.initSession({
        'token': response.data.token.token,
        'mode_facebook': false,
        'mode_linkedin': false,
        'mode_google_plus': false
      });
      this.httpService.setTokenProvider(response.data.token.token);
      this.resetPasswordForm.reset();
      this.navCtrl.push(TabsPage);
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
