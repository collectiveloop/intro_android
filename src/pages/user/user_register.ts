import { Component } from '@angular/core';
import { NavController, App, LoadingController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { SessionService }   from '../../lib/session.service';

import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

import { SettingUserPage } from '../user/user_setting';

@Component({
  selector: 'page-user-register',
  templateUrl: 'user_register.html'
})
export class RegisterUserPage {
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
        first_name: ['JUAN', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        last_name: ['gonzales', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
        email: ['renshocontact@gmail.com', Validators.compose([Validators.minLength(5),Validators.email, Validators.required]) ],
        password: ['12345678', Validators.compose( [Validators.minLength(8),Validators.maxLength(15), Validators.required]) ],
        confirm_password: ['12345678', Validators.compose([Validators.minLength(8),Validators.maxLength(15), Validators.required]) ]
    });
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
      let id = response.data.user_id;
      if(id !==0)
        this.navCtrl.push(SettingUserPage,{email:this.registerForm.value.email,password : this.registerForm.value.password,user_id:id});
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
