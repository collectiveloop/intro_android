import { Component } from '@angular/core';
import { NavController, App, LoadingController, Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { SessionService }   from '../../lib/session.service';

import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { SettingUserPage } from '../user/user_setting';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user-register',
  templateUrl: 'user_register.html'
})
export class RegisterUserPage {
  @ViewChild('firstName') firstName;
  @ViewChild('lastName') lastName;
  @ViewChild('userName') userName;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('confirmPassword') confirmPassword;
  registerForm: FormGroup;
  submitted: boolean;
  errorRegister: string;
  logo: string;
  loader: any;
  loadingMessage:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, private sessionService: SessionService, private loadingCtrl: LoadingController, private platform: Platform, public messages: MessageService) {
    this.buildValidations();
    this.configService.setSection('');
    this.translateService.get('SIGNUP').subscribe(
      value=>{
        console.log(value);
        this.configService.setSection(value);
      }
    );
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER') ;
      }
    );
  }

  ngAfterViewChecked() {}

  private buildValidations(){
    this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        last_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        user_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        email: ['', Validators.compose([Validators.minLength(5),Validators.email, Validators.required]) ],
        password: ['', Validators.compose( [Validators.minLength(8),Validators.maxLength(15), Validators.required]) ],
        confirm_password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(15), Validators.required]) ]
    });
  }

  public handleLogin(action:any):void {
    this[action].setFocus();
  }

  private back(): void {
    this.app.getRootNav().popToRoot();
  }

  public register():void{
    this.errorRegister='';
    this.submitted = true;
    if(this.registerForm.value.password!==this.registerForm.value.confirm_password){
      this.translateService.get('PASSWORD_NOT_MATCH').subscribe(
        value => {
          this.errorRegister=value;
        }
      )
      this.submitted = false;
      return;
    }
    let data={
      first_name : this.registerForm.value.first_name,
      last_name : this.registerForm.value.last_name,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password
    };

    if(this.registerForm.value.user_name!==null && this.registerForm.value.user_name!==undefined && this.registerForm.value.user_name!=='')
      data['user_name'] = this.registerForm.value.user_name;

    this.messages.showMessage({
       content:this.loadingMessage
    });
    //number_phones : this.registerForm.value.number_phones,
    this.httpService.post({
        url:'user',
        urlParams:[
          this.translateService.getDefaultLang()
        ],
        app: this.app,
        inputs:data,
        success: this.callBackRegister,
        error: this.callBackError,
        context:this,
    });
  }

  private callBackRegister(response:any):void{
    this.submitted = false;
    this.messages.closeMessage();
    if(response!==undefined && response.status!==undefined && response.status==='error'){
      this.errorRegister = response.data.message;
    }else{
      this.sessionService.initSession({
        'token': response.data.token,
        'mode_facebook': false,
        'mode_linkedin': false,
        'mode_google_plus': false
      });
      this.httpService.setTokenProvider(response.data.token);
      let id = response.data.user_id;
      if(id !==0){
        this.sessionService.initSession({
          'token': response.data.token,
          'mode_facebook': false,
          'mode_linkedin': false,
          'mode_google_plus': false
        });
        this.navCtrl.push(SettingUserPage,{user_id:id});
      }
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
