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

  public getDomainAPI(): any {
    if (CONFIG.ROUTES.DOMAIN_API === undefined || typeof CONFIG.ROUTES.DOMAIN_API != 'string')
      return '';

    return CONFIG.ROUTES.DOMAIN_API;
  }

  public getDomainImages(): any {
    if (CONFIG.ROUTES.FOLDER_IMAGES === undefined || typeof CONFIG.ROUTES.FOLDER_IMAGES != 'string')
      return '';

    return CONFIG.ROUTES.FOLDER_IMAGES;
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

  public getLogo(element: string): any {
    if (element === undefined || element === null || CONFIG.LOGOS[element] === undefined)
      return false;

    return CONFIG.LOGOS[element];
  }

  public getProfileImage(): any {
    if (CONFIG.PROFILE_IMAGE === undefined || CONFIG.PROFILE_IMAGE === null || CONFIG.PROFILE_IMAGE === '')
      return false;

    return CONFIG.PROFILE_IMAGE;
  }
}
