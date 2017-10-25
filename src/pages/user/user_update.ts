import { Component, ViewChild } from '@angular/core';
import { NavController, App} from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { ConfigService } from '../../lib/config.service';
import { MessageService } from '../../lib/messages.service';
import { HttpService } from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-user-update',
  templateUrl: 'user_update.html',
  providers:[ImagePicker]
})
export class UpdateUserPage {
  @ViewChild('firstName') firstName;
  @ViewChild('lastName') lastName;
  @ViewChild('userName') userName;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('confirmPassword') confirmPassword;
  updateForm: FormGroup;
  submitted: boolean;
  ready: boolean;
  errorUpdate: string;
  successUpdate:string;
  logo: string;
  loadingMessage:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private configService: ConfigService, private httpService: HttpService, private translateService: TranslateService, public messages: MessageService) {
    this.buildValidations();
    this.logo = this.configService.getLogo('BIGGER');
    this.ready = false;
  }

  public handleLogin(action:any):void {
    this[action].setFocus();
  }

  private buildValidations(): void {
    this.updateForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
      last_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
      user_name: ['', Validators.compose([Validators.minLength(2), Validators.required]) ] ,
      email: ['', Validators.compose([Validators.minLength(5),Validators.email, Validators.required]) ],
      password: ['', Validators.compose( [Validators.minLength(8),Validators.maxLength(15)]) ],
      confirm_password: ['', Validators.compose([Validators.minLength(8),Validators.maxLength(15)]) ]
    });

    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.messages.showMessage({
          content:this.loadingMessage
        });
        this.getUser();
      }
    );
  }

  private getUser():void{
    //consultamos los datos del usuario
    this.httpService.get({
      url: 'user',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      success: function(response: any): void {
        this.messages.closeMessage();
        let data = response.data.user;
        this.updateForm.controls['first_name'].patchValue(data.first_name);
        this.updateForm.controls['first_name'].setValue(data.first_name);
        this.updateForm.controls['last_name'].patchValue(data.last_name);
        this.updateForm.controls['last_name'].setValue(data.last_name);
        this.updateForm.controls['user_name'].patchValue(data.user_name);
        this.updateForm.controls['user_name'].setValue(data.user_name);
        this.updateForm.controls['email'].patchValue(data.email);
        this.updateForm.controls['email'].setValue(data.email);
        this.ready = true;
      },
      context: this,
    });
  }

  public submitForm(){
    if(this.updateForm.valid)
      this.update();
  }

  public update(): void {
    this.errorUpdate = '';
    this.successUpdate = '';
    this.submitted = true;
    this.updateForm.value.password = this.updateForm.value.password.replace('"', '').replace('\'', '');
    if (this.updateForm.value.password !== this.updateForm.value.confirm_password) {
      this.translateService.get('PASSWORD_NOT_MATCH').subscribe(
        value => {
          this.errorUpdate = value;
        }
      );
      this.submitted = false;
      return;
    }

    this.messages.showMessage({
       content:this.loadingMessage
    });
    let dataPut = {
      first_name: this.updateForm.value.first_name,
      last_name: this.updateForm.value.last_name,
      user_name: this.updateForm.value.user_name,
      email: this.updateForm.value.email
    };

    if (this.updateForm.value.password.trim() !== '')
      dataPut['password'] = this.updateForm.value.password;

    //number_phones : this.updateForm.value.number_phones,
    let paramsPut = {
      url: 'user',
      urlParams: [
        this.translateService.getDefaultLang()
      ],
      app: this.app,
      inputs: dataPut,
      success: this.callBackUpdate,
      error: this.callBackError,
      context: this,
    };

    this.httpService.put(paramsPut);
  }

  private callBackUpdate(response: any): void {
    this.messages.closeMessage();
    this.submitted = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.errorUpdate = response.data.message;
    } else {
      this.successUpdate = response.data.message;
      this.navCtrl.pop();
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
