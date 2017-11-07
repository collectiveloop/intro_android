import { Injectable } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';

@Injectable()
export class ContactService {
    contactsDevice:any = [];
    contactLoaded:boolean = false;
    contactPromise:any;
    constructor(public contactsNative: Contacts) {}

    public getContacts(): any {
      this.contactLoaded = false;
      console.log('search_contact');
      this.contactPromise = new Promise((resolve, reject) => {
        this.contactsNative.find(['displayName', 'name', 'emails'], {filter: '',multiple : true}).then((contacts)=>{
          if(contacts.length>0)
            this.contactsDevice = contacts;

        this.contactLoaded = true;
        this.contactPromise = null;
        resolve(this.contactsDevice);
        },(error)=>{
          console.log(error);
          reject(error);
        });
      });

      return this.contactPromise;
    }

    public getContactsDevice(): any {
      if(!this.contactLoaded && (this.contactPromise!==undefined && this.contactPromise!==null)){
        return this.contactPromise;
      }else{
        return new Promise((resolve, reject) => {
          if(this.contactLoaded){
            resolve(this.contactsDevice);
          }else{
            this.getContacts().then((contacts)=>{
              resolve(contacts);
            },(error)=>{
              reject(error);
            });
          }
        });
      }

    }
}
