import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MessageService } from './messages.service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LinkedIn } from '@ionic-native/linkedin';

@Injectable()
export class SessionService {
    ignoreSession:boolean = false;
    destiny:any = {};
    constructor(private storage: Storage, private facebook: Facebook,public googlePlus: GooglePlus, public linkedin: LinkedIn, public messages: MessageService) {}
    //this.storage.set('name', 'Maddddx');
    //this.storage.remove('name');
    //this.storage.get('name');
    //verificamos si hay token para que no entremosen esta pantalla
    public getSessionStatus(): any {
      return new Promise((resolve, reject) => {
        //verificamos si hay sesion por medio de la existencia del token en local storage
        this.storage.get('token').then(
          function(data:any){
            if(data!==null && data!==undefined && data!==''){
              //ahora vamos  a analizar el tipo de sesion, o es una sesiónnormal o es con facebook, tiene mecanismo sde control distintos
              this.storage.get('mode_facebook').then(
                function(data:any){
                  if(data!==null && data!==undefined && data!==false){
                    //una sesión usando facebook, vemos si hubo sesión
                    this.facebook.getLoginStatus()
                    .then(rta => {
                      if(rta.status === 'connected'){
                        resolve('facebook'); // hay sesion en la app y en facebook
                      }else{
                          //hubo sesión previa por facebook (mode_facebook no los indica) pero ya no lo está enconces debemos quitar el token y todas las variables del storage
                        this.storage.remove('token');
                        this.storage.remove('mode_facebook');
                        this.storage.remove('mode_linkedin');
                        this.storage.remove('mode_google_plus');
                        resolve(false); //no hay sesion facebook, ya no hay variables de sesion de la app
                      }
                    },function(error){
                      console.error( error );//cuando se cancela
                      resolve(false);
                    })
                    .catch(error =>{
                      console.error( error );//cuando se cancela
                      resolve(false);
                    });
                  }else{
                      //verificamos linkedin
                      this.storage.get('mode_linkedin').then(
                          function(data){
                              if(data!==null && data!==undefined && data!==false){
                                //una sesión usando linkedin, vemos si hubo sesión
                                this.linkedin.getActiveSession()
                                .then(session => {
                                  if(session){
                                    resolve('linkedin'); // hay sesion en la app y en linkedin
                                  }else{
                                      //hubo sesión previa por linkedin pero ya no lo está enconces debemos quitar el token y todas las variables del storage
                                    this.storage.remove('token');
                                    this.storage.remove('mode_facebook');
                                    this.storage.remove('mode_linkedin');
                                    this.storage.remove('mode_google_plus');
                                    resolve(false); //no hay sesion facebook, ya no hay variables de sesion de la app
                                  }
                                },function(error){
                                  console.error( error );//cuando se cancela
                                  resolve(false);
                                })
                                .catch(error =>{
                                  console.error( error );//cuando se cancela
                                  resolve(false);
                                });
                              }else{
                                  //verificamos google plus
                                  this.storage.get('mode_google_plus').then(
                                      function(data){
                                        console.log("googleplus");
                                        console.log(data);
                                          if(data!==null && data!==undefined && data!==false){
                                            //una sesión usando facebook, vemos si hubo sesión
                                            this.googlePlus.trySilentLogin({'scopes':'profile email'})
                                            .then(result => {
                                              resolve('google_plus'); // hay sesion en la app y en google_plus
                                            },function(error){
                                              console.error( error );//cuando se cancela
                                              this.storage.remove('token');
                                              this.storage.remove('mode_facebook');
                                              this.storage.remove('mode_linkedin');
                                              this.storage.remove('mode_google_plus');
                                              resolve(false);
                                            }.bind(this))
                                            .catch(error =>{
                                              console.error( error );//cuando se cancela
                                              resolve(false);
                                            });
                                          }else{
                                              //una sesión tradicional
                                              resolve('normal'); // sesion tradicional
                                          }
                                      }.bind(this)
                                  );
                              }
                          }.bind(this)
                      );

                  }
                }.bind(this)
              );
            }else{
              resolve(false); // no hay sesion en la app
            }
          }.bind(this)
        );
      });
    }

    public setIgnoreSession(ignoreSession:boolean):void{
      this.ignoreSession = ignoreSession;
    }

    public getIgnoreSession():boolean{
      return this.ignoreSession;
    }

    public setDestinySession(destiny:any,params:any):void{
      this.destiny.target = destiny;
      this.destiny.params = params;
    }

    public cleanDestinySession():void{
      this.destiny = {};
    }

    public getDestinySession():any{
      return this.destiny;
    }

    public loginByFacebook():any{
      return new Promise((resolve, reject) => {
        this.facebook.login(['public_profile', 'email'])
        .then(rta => {
          console.log(rta);
          if(rta.status == 'connected'){
            this.initSession({
              'token':'',
              'mode_facebook':true,
              'mode_linkedin':false,
              'mode_google_plus':false
            });
            resolve('normal');
          };
        })
        .catch(error =>{
          console.error( error );//cuando se cancela
          resolve(false);
        });
      });
    }

    public loginByLinkedin():any{
      return new Promise((resolve, reject) => {
        this.linkedin.login(['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'], false)
        .then(result => {
          console.log(result);
            this.initSession({
              'token':'',
              'mode_facebook':false,
              'mode_linkedin':true,
              'mode_google_plus':false
            });
            resolve('normal');
        })
        .catch(error =>{
          console.error( error );//cuando se cancela
          resolve(false);
        });
      });
    }

    public loginByGooglePlus():any{
      return new Promise((resolve, reject) => {
        this.googlePlus.logout()
        .then(success => {
          this.googlePlus.login({'scopes':'profile email'})
          .then(result => {
              this.initSession({
                'token':'',
                'mode_facebook':false,
                'mode_linkedin':false,
                'mode_google_plus':true
              });
              resolve(result);
          })
          .catch(error =>{
            console.error( error );//cuando se cancela
            resolve(false);
          });
        },(error) =>{
          this.googlePlus.login({'scopes':'profile email'})
          .then(result => {
              this.initSession({
                'token':'',
                'mode_facebook':false,
                'mode_linkedin':false,
                'mode_google_plus':true
              });
              resolve(result);
          })
          .catch(error =>{
            console.error( error );//cuando se cancela
            resolve(false);
          });
        });
      });
    }

    public initSession(params:any): void {
      this.storage.set('token', params.token);
      this.storage.set('mode_facebook', params.mode_facebook);
      this.storage.set('mode_linkedin', params.mode_linkedin);
      this.storage.set('mode_google_plus', params.mode_google_plus);
    }

    public closeSession(): void {
      this.messages.closeMessage();
      this.storage.remove('token');
      this.storage.remove('mode_facebook');
      this.storage.remove('mode_linkedin');
      this.storage.remove('mode_google_plus');
      this.facebookLogOut();
      this.linkedinLogOut();
      this.googlePlusLogOut();

    }

    public facebookLogOut():void{
        this.facebook.getLoginStatus()
        .then(rta => {
          console.log(rta.status);
          if(rta.status === 'connected')
            this.facebook.logout();
        },function(error){
          console.error( error );
        })
        .catch(error =>{
          console.error( error );
        });
    }

    public linkedinLogOut():void{
        this.linkedin.getActiveSession()
        .then(session => {
          console.log('linkedin ',session);
          if(session)
            this.linkedin.logout();
        },function(error){
          console.error( error );
        })
        .catch(error =>{
          console.error( error );
        });
    }

    public googlePlusLogOut():void{
        this.googlePlus.logout()
        .then(success => {
          console.log('googlePlus ',success);
        },function(error){
          console.error( error );
        })
        .catch(error =>{
          console.error( error );
        });
    }

}
