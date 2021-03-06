import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config.data';

@Injectable()
export class ConfigService {
  section:string ='';

  public setSection(section:string): void {
    this.section = section;
  }

  public getSection(): string {
    return this.section;
  }

  public getAllConfig(): any {
    return CONFIG;
  }

  public getGeneral(): any {
    return CONFIG.GENERAL;
  }

  public getDomain(): any {
    if (CONFIG.ROUTES.DOMAIN === undefined || typeof CONFIG.ROUTES.DOMAIN != 'string')
      return '';

    return CONFIG.ROUTES.DOMAIN;
  }

  public getDomainAPI(): any {
    if (CONFIG.ROUTES.DOMAIN_API === undefined || typeof CONFIG.ROUTES.DOMAIN_API != 'string')
      return '';

    return this.getDomain()+CONFIG.ROUTES.DOMAIN_API;
  }

  public getDomainImages(): any {
    if (CONFIG.ROUTES.FOLDER_IMAGES === undefined || typeof CONFIG.ROUTES.FOLDER_IMAGES != 'string')
      return '';

    return this.getDomain()+CONFIG.ROUTES.FOLDER_IMAGES;
  }

  public getPolicy(): any {
    if (CONFIG.ROUTES.POLICY === undefined || typeof CONFIG.ROUTES.POLICY != 'string')
      return '';

    return this.getDomain()+CONFIG.ROUTES.POLICY;
  }

  public getTerms(): any {
    console.log(CONFIG.ROUTES.TERMS);
    if (CONFIG.ROUTES.TERMS === undefined || typeof CONFIG.ROUTES.TERMS != 'string')
      return '';

    return this.getDomain()+CONFIG.ROUTES.TERMS;
  }

  public getLanguage(): string {
    if (CONFIG.GENERAL.LANGUAGE === undefined || typeof CONFIG.GENERAL.LANGUAGE != 'string')
      return 'ES';

    return CONFIG.GENERAL.LANGUAGE;
  }

  public getQuantity(): number {
    if (CONFIG.GENERAL.QUANTITY === undefined || typeof CONFIG.GENERAL.QUANTITY !== 'number')
      return 0;

    return CONFIG.GENERAL.QUANTITY;
  }

  public getGoogleApiKey(): string {
    if (CONFIG.GENERAL.GOOGLE_APIKEY === undefined || typeof CONFIG.GENERAL.GOOGLE_APIKEY !== 'string')
      return '';

    return CONFIG.GENERAL.GOOGLE_APIKEY;
  }

  public getGoogleWebClientId(): string {
    if (CONFIG.GENERAL.GOOGLE_WEB_CLIENT_ID === undefined || typeof CONFIG.GENERAL.GOOGLE_WEB_CLIENT_ID !== 'string')
      return '';

    return CONFIG.GENERAL.GOOGLE_WEB_CLIENT_ID;
  }

  public getOneSignal(): any {
    if (CONFIG.ONE_SIGNAL === undefined)
      return '';

    return CONFIG.ONE_SIGNAL;
  }

  public getPlayList(): string {
    if (CONFIG.GENERAL.CURRENT_PLAY_LIST === undefined || typeof CONFIG.GENERAL.CURRENT_PLAY_LIST !== 'string')
      return '';

    return CONFIG.GENERAL.CURRENT_PLAY_LIST;
  }

  public getChannel(): string {
    if (CONFIG.GENERAL.CHANNEL === undefined || typeof CONFIG.GENERAL.CHANNEL !== 'string')
      return '';

    return CONFIG.GENERAL.CHANNEL;
  }

  public getLimitLetters(): any {
    if (CONFIG.GENERAL.MAX_LETTERS === undefined || typeof CONFIG.GENERAL.MAX_LETTERS !== 'object')
      return {
        titles:20,
        descriptions:40
      };

    return CONFIG.GENERAL.MAX_LETTERS;
  }

  public getGeneralDetail(element: string): any {
    if (element === undefined || element === null || CONFIG.GENERAL[element] === undefined)
      return false;

    return CONFIG.GENERAL[element];
  }

  public getChatInterval(): any {
    if (CONFIG.GENERAL.CHAT_INTERVAL === undefined || CONFIG.GENERAL.CHAT_INTERVAL === null || isNaN(CONFIG.GENERAL.CHAT_INTERVAL) || CONFIG.GENERAL.CHAT_INTERVAL < 0)
      return 0;

    return CONFIG.GENERAL.CHAT_INTERVAL;
  }

  public getLogo(element: string): any {
    if (element === undefined || element === null || CONFIG.LOGOS[element] === undefined)
      return false;

    return CONFIG.LOGOS[element];
  }

  public getProfileImage(): any {
    if (CONFIG.PROFILE_IMAGE===undefined || CONFIG.PROFILE_IMAGE===null || CONFIG.PROFILE_IMAGE.DEFAULT_ICON === undefined || CONFIG.PROFILE_IMAGE.DEFAULT_ICON === null || CONFIG.PROFILE_IMAGE.DEFAULT_ICON === '')
      return false;

    return CONFIG.PROFILE_IMAGE.DEFAULT_ICON;
  }

  public getProfileSize(): any {
    if (CONFIG.PROFILE_IMAGE===undefined || CONFIG.PROFILE_IMAGE===null || CONFIG.PROFILE_IMAGE.WIDTH === undefined || CONFIG.PROFILE_IMAGE.WIDTH === null || isNaN(CONFIG.PROFILE_IMAGE.WIDTH) || CONFIG.PROFILE_IMAGE.HEIGHT === undefined || CONFIG.PROFILE_IMAGE.HEIGHT === null || isNaN(CONFIG.PROFILE_IMAGE.HEIGHT))
      return false;

    return {
      WIDTH:CONFIG.PROFILE_IMAGE.WIDTH,
      HEIGHT:CONFIG.PROFILE_IMAGE.HEIGHT
    };
  }
}
