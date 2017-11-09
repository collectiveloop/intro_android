import { Component, ViewChild } from '@angular/core';
import { NavController, App, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../lib/messages.service';
import { SessionService }   from '../../lib/session.service';
import { HttpService }   from '../../lib/http.service';
import { TranslateService } from '@ngx-translate/core';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'form-intros',
  templateUrl: 'form_intros.html'
})
export class FormIntrosPage {
  @ViewChild('question_friend_1') questionFriend1;
  @ViewChild('question_friend_2') questionFriend2;
  @ViewChild('reason') reason;
  introsForm: FormGroup;
  intros:any;
  gainings:any;
  submitted: boolean;
  errorForm: string;
  gainSelected:boolean = false;
  loadingMessage:string = '';

  constructor(public navCtrl: NavController, public app: App, private formBuilder: FormBuilder, private httpService: HttpService, private translateService: TranslateService, private loadingCtrl: LoadingController, public messages: MessageService, public navParams: NavParams) {
    if(this.navParams.get('intros')===undefined || this.navParams.get('intros')===null)
      this.navCtrl.pop();
    this.intros = this.navParams.get('intros');
    console.log(this.intros);
    this.buildValidations();
    this.translateService.get('LOADING').subscribe(
      value=>{
        this.loadingMessage = value;
        this.initForm();
      }
    );
  }

  public initForm():void{
    this.messages.showMessage({
       content:this.loadingMessage
    });
    let params = {
        url:'gainings',
        urlParams:[
          this.translateService.getDefaultLang()
        ],
        app: this.app,
        success: this.callBackGainings,
        error: this.callBackError,
        context:this,
    };

    this.httpService.get(params);
  }

  private callBackGainings(response:any):void{
    this.messages.closeMessage();
    this.gainings = response.data.gainings;
    let length = this.gainings.length;
    for(let i=0;i<length;i++){
      this.gainings[i].value=false;
    }
  }

  private buildValidations(){
    this.introsForm = this.formBuilder.group({
        question_friend_1: ['', Validators.compose([Validators.minLength(5), Validators.required]) ] ,
        question_friend_2: ['', Validators.compose([Validators.minLength(5), Validators.required]) ] ,
        reason: ['', Validators.compose([Validators.minLength(5), Validators.required]) ]
    });
  }

  public handleForm(action:any):void {
    this[action].setFocus();
  }

  public submitForm(){
    if(this.introsForm.valid)
      this.register();
  }

  private back(): void {
    this.app.getRootNav().popToRoot();
  }

  public register():void{
    this.errorForm='';
    this.submitted = true;
    let data={
      question_friend_1 : this.introsForm.value.question_friend_1,
      question_friend_2 : this.introsForm.value.question_friend_2,
      friend_1:this.intros.friend_1.id_user_friend,
      friend_2:this.intros.friend_2.id_user_friend,
      reason : this.introsForm.value.reason
    };

    let length = this.gainings.length;
    for(let i=0;i<length;i++){
      data['gainings['+this.gainings[i].id+']'] = this.gainings[i].value;
    }

    console.log(data);
    this.messages.showMessage({
       content:this.loadingMessage
    });
    let params = {
        url:'intros',
        urlParams:[
          this.translateService.getDefaultLang()
        ],
        app: this.app,
        inputs:data,
        success: this.callBackRegister,
        error: this.callBackError,
        context:this,
    };

    this.httpService.post(params);
  }

  public check(gain:any):void{
    console.log(gain);
    let length = this.gainings.length;
    for(let i=0;i<length;i++){
      if(this.gainings[i].value!==undefined && this.gainings[i].value!==null && this.gainings[i].value===true){
        this.gainSelected = true;
        return;
      }
    }

    this.gainSelected = false;
  }

  private callBackRegister(response:any):void{
    this.submitted = false;
    this.messages.closeMessage();
    if(response!==undefined && response.status!==undefined && response.status==='error'){
      this.errorForm = response.data.message;
    }else{
      this.navCtrl.push(TabsPage);
    }
  }

  private callBackError(response: any): void {
    this.messages.closeMessage();
  }
}
