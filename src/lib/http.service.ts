import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { ConfigService } from './config.service';
import { MessageService } from './messages.service';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';

/*
this.httpService.get({
    url:'http://localhost/fasttrack/api/public/login/token',
    success: function(res){
        console.log(res);
        this.myData = res;
    },
    context:this
});

this.httpService.delete({
    url:'http://localhost/fasttrack/api/public/payment-methods',
    urlParams:[
        8,
        {id:4}
    ],
    urlAltParams:{
        id:4
    },
    success: function(res){
        console.log(res);
    },
    context:this
});

this.httpService.put({
    url:'http://localhost/fasttrack/api/public/destino',
    urlParams:[
        4
    ],
    inputs:{uno:'1',dos:'2'},
    success: function(res){
        console.log(res);
    },
    context:this,
    files:this.files //opcional
});


this.httpService.post({
    url:'http://localhost/fasttrack/api/public/destino',
    urlParams:[
        4
    ],
    inputs:data,
    success: function(res){
        console.log(res);
    },
    context:this,
    files:this.files //opcional
});
*/

@Injectable()
export class HttpService {
  private tokenProvider: string;
  private url: string;
  private context: any = this;
  private success: any;
  private error: any;
  private finally: any;
  private options: any;
  private headers: any;
  private search: any;
  private app: App;
  private login:any;

  constructor(private http: Http, private configService: ConfigService, private storage: Storage, public messages: MessageService) { }

  public setParams(params: any): void {
    this.success = params.success;
    let isExternal = params.url.indexOf("http");
    if (isExternal === -1)
      this.url = this.configService.getDomainAPI() + '/' + params.url;
    else
      this.url = params.url;
    this.error = function() { };
    this.finally = function() { };
    if (params.error !== undefined && typeof params.error == 'function')
      this.error = params.error;
    if (params.app !== undefined)
      this.app = params.app;

    if (params.finally !== undefined && typeof params.finally == 'function')
      this.finally = params.finally;
    if (params.context !== undefined)
      this.context = params.context;
    this.options = new RequestOptions();
    this.headers = new Headers();
    this.search = new URLSearchParams();
    if (this.getTokenProvider() !== '' && isExternal === -1) {
      this.headers.append('Authorization', ' Bearer ' + this.getTokenProvider());
    }
    this.options.headers = this.headers;

    if (params.urlParams !== undefined && params.urlParams instanceof Array) {
      let max_length = params.urlParams.length;
      for (let i = 0; i < max_length; i++) {
        let current = params.urlParams[i];
        if (typeof current == 'object') {
          for (let key in current) {
            if (key !== '')
              this.url = this.url + '/' + key + '/' + current[key];
            else
              this.url = this.url + '/' + current[key];
          }
        } else {
          this.url = this.url + '/' + current;
        }
        this.options.search = this.search;
      }
    }

    if (params.urlAltParams !== undefined && typeof params.urlAltParams == 'object') {
      for (let key in params.urlAltParams) {
        this.search.set(key, params.urlAltParams[key]);
      }
      this.options.search = this.search;
    }
  }

  public get(params: any): any {
    if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
      this.storage.get('token').then(
        function(token: any) {
          this.setTokenProvider(token);
          this.setParams(params);
          this.sendGet();
        }.bind(this)
      );
    }
  }

  public sendGet(): void {
    this.http.get(this.url, this.options)
      .map(response => response.json())
      .subscribe(this.successCallBack.bind(
        {
          success: this.success.bind(this.context)
        }), this.errorCallBack.bind(
          {
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages,
            getLogin: this.getLogin.bind(this)
          }), this.finallyCallBack.bind(
            {
              finally: this.finally
            })
      );
  }

  public post(params: any): any {
    if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
      this.storage.get('token').then(
        function(token: any) {
          this.setTokenProvider(token);
          this.setParams(params);
          let data = new FormData();
          if (params.inputs !== undefined && typeof params.inputs == 'object') {
            for (let key in params.inputs) {
              data.append(key, params.inputs[key]);
            }
          }

          if (params.files !== undefined && typeof params.files == 'object') {
            let maxFiles = Object.keys(params.files).length;
            let countFiles = 0;
            for (let key in params.files) {
              //hay que evaluar si es dataurl o es un binario de una vez
              data.append(key, this.dataURItoBlob(params.files[key]));
              countFiles++;
              if (maxFiles === countFiles)
                this.sendPost(data);
            }
          } else {
            this.sendPost(data);
          }
        }.bind(this)
      );
    }
  }

  public sendPost(data: any): void {
    this.http.post(this.url, data, this.options)
      .map(response => response.json())
      .subscribe(this.successCallBack.bind(
        {
          success: this.success.bind(this.context)
        }), this.errorCallBack.bind(
          {
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages,
            getLogin: this.getLogin.bind(this)
          }), this.finallyCallBack.bind(
            {
              finally: this.finally
            })
      );
  }

  public put(params: any): any {
    if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
      this.storage.get('token').then(
        function(token: any) {
          this.setTokenProvider(token);
          this.setParams(params);
          if (params.files !== undefined && typeof params.files == 'object') {
            let data = new FormData();
            if (params.inputs !== undefined && typeof params.inputs == 'object') {
              for (let key in params.inputs) {
                data.append(key, params.inputs[key]);
              }
            }
            let maxFiles = Object.keys(params.files).length;
            let countFiles = 0;
            for (let key in params.files) {
              data.append(key, this.dataURItoBlob(params.files[key]));
              countFiles++;
              if (maxFiles === countFiles)
                this.sendFilePut(data);
            }
          } else {
            let data = {};
            if (params.inputs !== undefined && typeof params.inputs == 'object')
              data = params.inputs;
            this.sendPut(data);
          }
        }.bind(this)
      );
    }
  }

  public sendPut(data: any): void {
    this.http.put(this.url, data, this.options)
      .map(response => response.json())
      .subscribe(this.successCallBack.bind(
        {
          success: this.success.bind(this.context)
        }), this.errorCallBack.bind(
          {
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages,
            getLogin: this.getLogin.bind(this)
          }), this.finallyCallBack.bind(
            {
              finally: this.finally
            })
      );
  }

  public sendFilePut(data: any): void {
    //NOTA EN CHROME Y ALGUNOS NAVEGADORES NO SIRVE PUT, POR ESO HACEMOS UN HACK Y USAMOS POST
    data.append('_method', 'PUT');
    this.http.post(this.url, data, this.options)
      .map(response => response.json())
      .subscribe(this.successCallBack.bind(
        {
          success: this.success.bind(this.context)
        }), this.errorCallBack.bind(
          {
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages,
            getLogin: this.getLogin.bind(this)
          }), this.finallyCallBack.bind(
            {
              finally: this.finally
            })
      );
  }

  public delete(params: any): void {
    if (typeof params == 'object' && params.url !== undefined && typeof params.url == 'string' && params.url !== '' && params.success !== undefined && typeof params.success == 'function') {
      this.storage.get('token').then(
        function(token: any) {
          this.setTokenProvider(token);
          this.setParams(params);
          this.sendDelete();
        }.bind(this)
      );
    }
  }

  public sendDelete(): void {
    this.http.delete(this.url, this.options)
      .map(response => response.json())
      .subscribe(this.successCallBack.bind(
        {
          success: this.success.bind(this.context)
        }), this.errorCallBack.bind(
          {
            error: this.error.bind(this.context),
            app: this.app,
            storage: this.storage,
            messages: this.messages,
            getLogin: this.getLogin.bind(this)
          }), this.finallyCallBack.bind(
            {
              finally: this.finally
            })
      );
  }

  //esta funcion e spara cuando la imagen que se tiene se accede es desde la url, no base 64
  public prepareFile(file: File): any {
    return new Promise((resolve, reject) => {
      let reader: FileReader = new FileReader();
      reader.onload = resolve;
      reader.readAsDataURL(file);
    });
  }

  //para convertir el archivo a blob, requiere que sea una cadena codificada, anidad con  el mime, DATAURI  base64
  public dataURItoBlob(dataURI): any {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let bb = new Blob([ab], { "type": mimeString });

    return bb;
  }

  private successCallBack(response: any): void {
    this.success(response);
  }

  private errorCallBack(error: any): void {
    var errorDetail;
    try {
      errorDetail = JSON.parse(error._body);
    } catch (e) { }

    if ((errorDetail !== null && errorDetail !== undefined && (errorDetail.status === 'error' && errorDetail.data.type === 'session') ) || errorDetail===undefined  ) {
      this.storage.remove('token');
      this.messages.closeMessage();
      this.app.getRootNav().setRoot(this.getLogin());
    }

    this.error(error);
  }

  private finallyCallBack(): void {
    this.finally();
  }

  public setTokenProvider(token: string): void {
    this.tokenProvider = token;
  }

  public getTokenProvider(): string {
    if (this.tokenProvider === undefined || this.tokenProvider === null || this.tokenProvider === '')
      return '';
    return this.tokenProvider;
  }

  public setLogin(login:any): void {
    console.log("asignnado");
    console.log(login);
    this.login = login;
  }

  public getLogin(): any {
    console.log(this.login);
    if (this.login === undefined || this.login === null)
      return {};

    return this.login;
  }
}
