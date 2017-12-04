import { Component, ViewChild } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { SessionService }   from '../../lib/session.service';
import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../tabs/tabs';
import { OneSignal } from '@ionic-native/onesignal';

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
  @ViewChild('fullName') fullName;
  registerForm: FormGroup;
  submitted: boolean;
  errorRegister: string;
  logo: string;
  loader: any;
  loadingMessage:string = '';
  actionSheet: any;
  pushId:string='';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, private sessionService: SessionService, public messages: MessageService, public platform:Platform, public oneSignal: OneSignal) {
    this.buildValidations();
    if (this.platform.is('cordova')) {
      this.oneSignal.getIds().then((ids)=>{
        console.log(ids);
        this.pushId = ids.userId;
      });
    }
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER') ;
      }
    );
  }

  private buildValidations(){
    this.registerForm = this.formBuilder.group({
        first_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        last_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        user_name: ['', Validators.compose([Validators.minLength(5), Validators.required]) ] ,
        email: ['', Validators.compose([Validators.minLength(5),Validators.email, Validators.required]) ],
        password: ['', Validators.compose( [Validators.minLength(8),Validators.maxLength(15), Validators.required]) ],
        confirm_password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(15), Validators.required]) ]
    });
  }

  public handleLogin(action:any):void {
    this[action].setFocus();
  }

  public submitForm(){
    if(this.registerForm.valid)
      this.register();
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
      email : this.registerForm.value.email.toLowerCase(),
      user_name : this.registerForm.value.user_name.toLowerCase(),
      password : this.registerForm.value.password,
      push_id: this.pushId
    };

    this.messages.showMessage({
       content:this.loadingMessage
    });
    let params = {
        url:'user',
        urlParams:[
          this.translateService.getDefaultLang()
        ],
        app: this.app,
        inputs:data,
        success: this.callBackRegister,
        error: this.callBackError,
        context:this,
    };

    //number_phones : this.registerForm.value.number_phones,
    this.httpService.post(params);
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
      this.navCtrl.push(TabsPage);
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
