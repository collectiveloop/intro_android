import { Component, ViewChild } from '@angular/core';
import { NavController, App, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change_password.html'
})
export class ChangePasswordPage {
  @ViewChild('oldPassword') oldPassword;
  @ViewChild('password') password;
  @ViewChild('confirmPassword') confirmPassword;
  changePasswordForm: FormGroup;
  submitted: boolean;
  errorPasswordForm: string;
  logo: string;
  loader: any;
  loadingMessage:string = '';
  token:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public messages: MessageService, public navParams: NavParams) {
    this.buildValidations();
    this.submitted = false;
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER') ;
      }
    );
  }

  private buildValidations(){
    this.changePasswordForm = this.formBuilder.group({
        old_password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.required])],
        password: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.required])],
        confirm_password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(15), Validators.required]) ]
    });
  }

  public handleReset(action:any):void {
    this[action].setFocus();
  }

  public submitForm(){
    if(this.changePasswordForm.valid)
      this.sendRequest();
  }

  public sendRequest():void{
    this.submitted = true;
    this.errorPasswordForm='';

    if(this.changePasswordForm.value.password!==this.changePasswordForm.value.confirm_password){
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
      old_password : this.changePasswordForm.value.old_password,
      password : this.changePasswordForm.value.password,
    };
    this.messages.showMessage({
       content:this.loadingMessage
    });

    this.httpService.post({
        url:'user/change-password',
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
      this.changePasswordForm.reset();
      this.navCtrl.push(TabsPage);
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
