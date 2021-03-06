import { Component, ViewChild } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot_password.html'
})
export class ForgotPasswordPage {
  @ViewChild('email') email;
  forgotPasswordForm: FormGroup;
  submitted: boolean;
  errorPasswordForm: string;
  successPasswordForm: string;
  logo: string;
  loader: any;
  loadingMessage:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public messages: MessageService) {
    this.buildValidations();
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.logo = this.configService.getLogo('BIGGER') ;
      }
    );
  }

  private buildValidations(){
    this.forgotPasswordForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.minLength(5), Validators.required]) ]
    });
  }

  public submitForm(){
    if(this.forgotPasswordForm.valid)
      this.sendRequest();
  }

  public sendRequest():void{
    this.errorPasswordForm='';
    this.successPasswordForm='';
    this.submitted = true;
    let data={
      email : this.forgotPasswordForm.value.email.toLowerCase()
    };
    this.messages.showMessage({
       content:this.loadingMessage
    });

    this.httpService.post({
        url:'login/forgot-password',
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
    if(response!==undefined && response.status!==undefined && response.status==='error')
      this.errorPasswordForm = response.data.message;
    else
      this.successPasswordForm = response.data.message;
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
