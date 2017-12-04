import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../lib/http.service';
import { MessageService } from '../../lib/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../lib/config.service';
import { TimeService } from '../../lib/time.service';
import { PushNotificationService } from '../../lib/pushNotification.service';
import { DetailIntrosPage } from '../intros/detail_intros';
import { UtilService } from '../../lib/utils.service';

@Component({
  selector: 'chat-messages',
  templateUrl: 'chat_messages.html'
})
export class ChatMessagesPage {
  @ViewChild('message') message;
  @ViewChild('content') content: Content;
  @ViewChild('scroll') scroll: any;
  introId: any;
  roomId: any = 0;
  quantity: number = 0;
  pullRequest: any = [];
  infiniteScroll: any;
  listMessages: any = [];
  firstMessage: number = 0;
  lastMessage: number = 0;
  membersLoaded: boolean = false;
  myUser: number = 0;
  requestSent: boolean = false;
  noMessages: boolean = false;
  noGranted: boolean = false;
  members: any = [];
  loadingMessage: string = '';
  route: string = '';
  ios: boolean = false;
  submitted: boolean = false;
  roomForm: FormGroup;
  classInput: string = '';
  typeAdd: string = '';
  interval: Number = 0;
  pushMaxLetters: string = '';
  pushContent: any = { title: '', content: '' };

  constructor(public app: App, private navCtrl: NavController, private httpService: HttpService, private translateService: TranslateService, private configService: ConfigService, public messages: MessageService, public navParams: NavParams, public sanitizer: DomSanitizer, private platform: Platform, private formBuilder: FormBuilder, private timeService: TimeService, public pushNotificationService: PushNotificationService, private utilService: UtilService) {
    this.infiniteScroll = this.scroll;
    if (this.navParams.get('introId') === undefined || this.navParams.get('introId') === null || this.navParams.get('introId') === '')
      this.navCtrl.pop();

    if (this.platform.is('ios')) {
      this.classInput = 'input-container';
      this.ios = true;
    } else {
      this.ios = false;
      this.classInput = 'message';
    }
    this.buildValidations();
    this.pushMaxLetters = this.configService.getLimitLetters();

    //recojemos los parametros
    this.introId = this.navParams.get('introId');
    this.interval = this.configService.getChatInterval();
    this.translateService.get('LOADING').subscribe(
      value => {
        this.loadingMessage = value;
        this.quantity = this.configService.getQuantity();
        this.route = this.configService.getDomainImages() + '/profiles/';
      }
    );

    this.translateService.get('PUSH_MESSAGE_TITLE').subscribe(
      value => {
        this.pushContent.title = value;
      }
    );
    this.getMessages({ type: 'old', room: true, add: 'reverse' });
  }

  private getMessages(config: any): void {
    this.timeService.cancelDelay();
    if (config.automatic != undefined && config.automatic != null && config.automatic === true)
      this.requestSent = false;
    else
      this.requestSent = true;
    let params = [
      this.translateService.getDefaultLang(),
      this.introId
    ];

    if (config.type === 'old') {
      params.push({ quantity: this.quantity });
    } else {
      params.push('news');
    }

    if (config.add !== undefined && config.add !== null)
      this.typeAdd = config.add;
    else
      this.typeAdd = 'normal';

    if (config.room !== undefined && config.room !== null && config.room === true)
      params.push({ room: true });
    else
      params.push({ room: false });

    if (config.message !== undefined && config.message !== null && config.message !== 0)
      params.push(config.message);

    this.httpService.get({
      url: 'messages',
      urlParams: params,
      app: this.app,
      success: this.callBackMessages,
      context: this
    });
  }

  private callBackMessages(response): void {
    this.messages.closeMessage();
    this.requestSent = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.noGranted = true;
      this.messages.showMessage({
        content: response.data.message,
        spinner: false,
        duration: 3000
      });
      //para buscar nuevos mensajes
      this.initInterval();
    } else {

      this.myUser = response.data.id_user;
      this.makeMembers(response.data.room).then((made: boolean) => {
        let messages = response.data.messages;
        let messagesLength = messages.length;
        if (messagesLength != 0) {
          this.loadRecentMessages(messages, messagesLength);
        } else {
          if (this.listMessages.length === 0)
            this.noMessages = true;
          this.messages.closeMessage();
          this.refreshScroll(false);
        }
      });
    }
  }

  private makeMembers(room: any): any {
    return new Promise((resolve, reject) => {
      let countType = 0;
      if (room !== undefined && room !== null) {
        this.roomId = room['id'];
        this.members[room['id_user_1']] = {
          first_name: room['user_1_first_name'],
          last_name: room['user_1_last_name'],
          imageProfile: room['user_1_image_profile'],
          push_id: room['user_1_push_id'],
          imageLoaded: false,
          user_name: room['user_1_name'],
          style: ''
        };

        //validamso que no sea el usuario logueado de la app, de acuerdo a esto se le ponmdrá un estilo particular para los 'otros' que esten en el chat
        if (this.myUser != room['id_user_1']) {
          countType++;
          this.members[room['id_user_1']]['style'] = 'type' + countType;
        }

        if (room['user_1_image_profile'] !== undefined && room['user_1_image_profile'] !== null && room['user_1_image_profile'] !== '') {
          this.members[room['id_user_1']]['imageLoaded'] = false;
          if (room['user_1_image_profile'].indexOf('http') === -1)
            this.members[room['id_user_1']]['imageProfile'] = this.route + this.members[room['id_user_1']]['imageProfile'];

          this.members[room['id_user_1']]['url'] = this.members[room['id_user_1']]['imageProfile'];
          this.members[room['id_user_1']]['imageProfile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.members[room['id_user_1']]['imageProfile'] + ')');
        } else {
          this.members[room['id_user_1']]['imageLoaded'] = true;
          this.members[room['id_user_1']]['imageProfile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
        }
        if (this.members[room['id_user_1']]['imageLoaded'] === false)
          this.loadImage(this.members[room['id_user_1']]);

        this.members[room['id_user_2']] = {
          first_name: room['user_2_first_name'],
          last_name: room['user_2_last_name'],
          imageProfile: room['user_2_image_profile'],
          push_id: room['user_2_push_id'],
          imageLoaded: false,
          user_name: room['user_2_name'],
          style: ''
        };
        if (this.myUser != room['id_user_2']) {
          countType++;
          this.members[room['id_user_2']]['style'] = 'type' + countType;
        }

        if (room['user_2_image_profile'] !== undefined && room['user_2_image_profile'] !== null && room['user_2_image_profile'] !== '') {
          this.members[room['id_user_2']]['imageLoaded'] = false;
          if (room['user_2_image_profile'].indexOf('http') === -1)
            this.members[room['id_user_2']]['imageProfile'] = this.route + this.members[room['id_user_2']]['imageProfile'];

          this.members[room['id_user_2']]['url'] = this.members[room['id_user_2']]['imageProfile'];
          this.members[room['id_user_2']]['imageProfile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.members[room['id_user_2']]['imageProfile'] + ')');
        } else {
          this.members[room['id_user_2']]['imageLoaded'] = true;
          this.members[room['id_user_2']]['imageProfile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
        }
        if (this.members[room['id_user_2']]['imageLoaded'] === false)
          this.loadImage(this.members[room['id_user_2']]);

        this.members[room['id_user_3']] = {
          first_name: room['user_3_first_name'],
          last_name: room['user_3_last_name'],
          imageProfile: room['user_3_image_profile'],
          push_id: room['user_3_push_id'],
          imageLoaded: false,
          user_name: room['user_3_name'],
          style: ''
        };

        if (this.myUser != room['id_user_3']) {
          countType++;
          this.members[room['id_user_3']]['style'] = 'type' + countType;
        }

        if (room['user_3_image_profile'] !== undefined && room['user_3_image_profile'] !== null && room['user_3_image_profile'] !== '') {
          this.members[room['id_user_3']]['imageLoaded'] = false;
          if (room['user_3_image_profile'].indexOf('http') === -1)
            this.members[room['id_user_3']]['imageProfile'] = this.route + this.members[room['id_user_3']]['imageProfile'];

          this.members[room['id_user_3']]['url'] = this.members[room['id_user_3']]['imageProfile'];
          this.members[room['id_user_3']]['imageProfile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.members[room['id_user_3']]['imageProfile'] + ')');
        } else {
          this.members[room['id_user_3']]['imageLoaded'] = true;
          this.members[room['id_user_3']]['imageProfile'] = this.sanitizer.bypassSecurityTrustStyle('url(' + this.configService.getProfileImage() + ')');
        }
        if (this.members[room['id_user_3']]['imageLoaded'] === false)
          this.loadImage(this.members[room['id_user_3']]);
        this.membersLoaded = true;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  private loadRecentMessages(messages: any, messagesLength: number): void {
    if (this.noMessages)
      this.noMessages = false;
    let index = messagesLength;
    if (index > 0 && this.typeAdd === 'normal')
      index = index + (this.listMessages.length - 1);
    for (let i = 0; i < messagesLength; i++) {
      if (this.lastMessage < messages[i]['id'] || this.lastMessage === 0)
        this.lastMessage = messages[i]['id'];

      if (this.firstMessage > messages[i]['id'] || this.firstMessage === 0)
        this.firstMessage = messages[i]['id'];

      let message = {
        id: messages[i]['id'],
        id_user: messages[i]['id_user'],
        message: messages[i]['message'],
        date: messages[i]['created_at'],
      }
      //trabajamos la fecha, el dia mes y año aparece cuando nos pasamos no es el dia actual
      let splitDate = messages[i]['created_at'].split(' ');
      let dateMessage = new Date(splitDate[0]);
      let date = new Date();
      let dateRaw = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      if (new Date(dateRaw).getTime() !== dateMessage.getTime())
        message.date = this.utilService.getFormatDate(messages[i]['created_at']);
      else
        message.date = this.utilService.getHour(messages[i]['created_at']);

      if (this.myUser != messages[i]['id_user'])
        message['style'] = 'left';
      else
        message['style'] = 'right';
      if (this.members[messages[i]['id_user']] !== undefined)
        message['style2'] = this.members[messages[i]['id_user']]['style'];
      if (this.typeAdd === 'normal') {
        this.listMessages[index] = message;
        index--;
      } else {
        this.listMessages.splice(0, 0, message);
      }
    }
    this.execPullRequest();
    this.refreshScroll(true);
    this.typeAdd = '';
  }

  public moreMessages(infiniteScroll): void {
    this.infiniteScroll = infiniteScroll;
    if (!this.noGranted) {
      if (!this.requestSent) {
        this.getMessages({ type: 'old', add: 'reverse', room: false, message: this.firstMessage });
      } else {
        this.pullRequest.push({ method: this.getMessages, params: { type: 'old', add: 'reverse', room: false, message: this.firstMessage } });
      }
    }
  }

  public execPullRequest(): void {
    let requestLength = this.pullRequest.length;
    for (let i = 0; i < requestLength; i++) {
      this.pullRequest[i]['method'](this.pullRequest[i]['params']);
    }
  }

  private loadImage(image: any): void {
    let img = new Image();
    /// set handler and url
    img.onload = this.onloadHandler.bind({ 'image': image });
    img.onerror = this.onErrorHandler.bind({ 'image': image, 'config': this.configService, 'sanitizer': this.sanitizer });
    img.src = image.url;
  }

  private onErrorHandler(data): void {
    this['image'].imageLoaded = true;
    this['image'].imageProfile = this.sanitizer.bypassSecurityTrustStyle('url(' + this['config'].getProfileImage() + ')');
  }

  private onloadHandler(data): void {
    if (this['image'] !== undefined)
      this['image'].imageLoaded = true;
  }

  private buildValidations() {
    this.roomForm = this.formBuilder.group({
      message: ['', Validators.compose([Validators.minLength(1), Validators.required])]
    });
  }

  public sendMessage(): void {
    if (this.roomForm.valid && this.roomId !== 0 && !this.requestSent) {
      this.submitted = true;
      let data = {
        message: this.roomForm.value.message
      };
      this.messages.showMessage({
        content: this.loadingMessage
      });

      let params = [
        this.translateService.getDefaultLang(),
        this.roomId,
        this.introId
      ];

      if (this.lastMessage !== 0)
        params.push(this.lastMessage);

      this.timeService.cancelDelay();
      this.httpService.post({
        url: 'messages',
        urlParams: params,
        app: this.app,
        inputs: data,
        success: this.callBackSendMessage,
        context: this,
      });
    } else {
      this.pullRequest.push({ method: this.sendMessage, params: {} });
    }
  }

  private callBackSendMessage(response: any): void {
    this.messages.closeMessage();
    this.submitted = false;
    if (response !== undefined && response.status !== undefined && response.status === 'error') {
      this.messages.showMessage({
        content: response.data.message,
        spinner: false,
        duration: 3000
      });
      //para buscar nuevos mensajes
      this.initInterval();
    } else {
      //actualziamos a losmiembros con su respectivo push id o quitandoselo de acuerdo al caso
      let users = response.data.room;
      if(users!==undefined && users['id_user_1']!==undefined && users['id_user_1']!=='' && users['user_1_push_id']!==undefined){
        if(this.members[users['id_user_1']]!==undefined && this.members[users['id_user_1']]!==null && users['user_1_push_id']!=='')
          this.members[users['id_user_1']]['push_id'] = users['user_1_push_id'];
        else
          this.members[users['id_user_1']]['push_id'] = '';
      }

      if(users!==undefined && users['id_user_2']!==undefined && users['id_user_2']!=='' && users['user_2_push_id']!==undefined){
        if(this.members[users['id_user_2']]!==undefined && this.members[users['id_user_2']]!==null && users['user_2_push_id']!=='')
          this.members[users['id_user_2']]['push_id'] = users['user_2_push_id'];
        else
          this.members[users['id_user_2']]['push_id'] = '';
      }

      if(users!==undefined && users['id_user_3']!==undefined && users['id_user_3']!=='' && users['user_3_push_id']!==undefined){
        if(this.members[users['id_user_3']]!==undefined && this.members[users['id_user_3']]!==null  && users['user_3_push_id']!=='')
          this.members[users['id_user_3']]['push_id'] = users['user_3_push_id'];
        else
          this.members[users['id_user_3']]['push_id'] = '';
      }
      //enviamos la notificación
      let ids = [];
      for (let key in this.members) {
        console.log(this.myUser.toString(), key);
        if (this.members[key]!==undefined && this.members[key]['push_id']!==undefined && this.members[key]['push_id'].trim() != '' && this.myUser.toString() != key.toString()) {
          console.log(this.myUser.toString(), key);
          console.log(this.members[this.myUser]['push_id'], this.members[key]['push_id']);
          ids.push(this.members[key]['push_id'].trim());
        }
      }

      let text = '';
      if (this.roomForm.value.message.trim().length > this.pushMaxLetters)
        text = this.members[this.myUser]['first_name'] + ' ' + this.members[this.myUser]['last_name'] + ': ' + this.roomForm.value.message.trim().substring(0, this.pushMaxLetters) + '...';
      else
        text = this.members[this.myUser]['first_name'] + ' ' + this.members[this.myUser]['last_name'] + ': ' + this.roomForm.value.message.trim();
      let params: any = {
        include_player_ids: ids,
        contents: {
          es: text,
          en: text
        },
        headings: {
          es: this.pushContent.title + ' ' + this.members[this.myUser]['first_name'] + ' ' + this.members[this.myUser]['last_name'],
          en: this.pushContent.title + ' ' + this.members[this.myUser]['first_name'] + ' ' + this.members[this.myUser]['last_name']
        },
        data: {
          'tabsIndex': 3,
          'introId': this.introId
        }
      };
      console.log(params);
      this.pushNotificationService.sendNotification(params);

      this.roomForm.controls['message'].patchValue('');
      this.roomForm.controls['message'].setValue('');
      this.message.setFocus();

      //cargamos lo qu enos retornó
      let messages = response.data.messages;
      let messagesLength = messages.length;
      this.typeAdd = 'normal';
      if (messagesLength != 0) {
        this.loadRecentMessages(messages, messagesLength);
      } else {
        if (this.listMessages.length === 0)
          this.noMessages = true;
        this.refreshScroll(true);
      }
    }
  }

  private refreshScroll(move: boolean): void {
    let exec;
    if (move) {
      if (this.typeAdd === 'normal' || this.typeAdd === '') {
        exec = () => {
          this.content.scrollToBottom(0);
        };
      } else {
        exec = () => {
          this.content.scrollToTop(0);
        };
      }
      this.timeService.delay({
        function: exec,
        duration: 0
      });
    }

    //para buscar nuevos mensajes
    this.initInterval();
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.complete();
  }

  private initInterval(): void {
    this.timeService.delay({
      function: () => {
        this.getMessages({ type: 'new', room: false, message: this.lastMessage, automatic: true });
      },
      duration: this.interval
    });
  }

  private disableScroll(): void {
    if (this.infiniteScroll !== undefined)
      this.infiniteScroll.enable(false);
  }

  public gotoDetail(): void {
    this.app.getRootNav().push(DetailIntrosPage, { introId: this.introId });
  }

  public backAction(): void {
    this.pullRequest = [];
    this.timeService.cancelDelay();
    this.navCtrl.pop();
  }
}
