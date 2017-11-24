import { Component, ViewChild } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService }   from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-contact-us',
  templateUrl: 'form_contact_us.html'
})
export class FormContactUsPage {
  contactUsForm: FormGroup;
  submitted: boolean = false;
  firstSubmitted: boolean = false;
  errorMessage: string;
  loadingMessage:string = '';
  successContactUsMessage:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public messages: MessageService) {
    this.buildValidations();
    this.submitted = false;
    this.firstSubmitted = false;
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
      }
    );

    this.translateService.get('CONTACT_US_SUCCESS').subscribe(
      value=>{
        this.successContactUsMessage = value;
      }
    );
  }

  private buildValidations(){
    this.contactUsForm = this.formBuilder.group({
        message: ['', Validators.compose([Validators.minLength(10), Validators.required]) ]
    });
  }

  public sendRequest():void{
    this.submitted = true;
    this.firstSubmitted = true;
    this.errorMessage='';
    let data={
      message : this.contactUsForm.value.message
    };
    this.messages.showMessage({
       content:this.loadingMessage
    });

    this.httpService.post({
        url:'contact-us',
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
      this.errorMessage = response.data.message;
    }else{
      this.messages.showMessage({
         content:this.successContactUsMessage,
         spinner:false,
         duration:3000
      });
      this.navCtrl.pop();
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
