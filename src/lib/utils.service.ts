import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() { }

  public getCropName(name: string): string {
    let finalName = '';
    if (typeof name == 'string' && name !== '') {
      finalName = name.replace(/ /g, '_').replace(/_/g, '-').toLowerCase();
    }
    return finalName;
  }

  public getFormatDate(date:string):string{
    return this.getDate(date)+' '+this.getHour(date);
  }

  public getDate(date:string):string{
    let split =  date.split(' ');
    if(split.length===2){
      let dateSplit = split[0].split('-');
      if(dateSplit.length===3)
        return dateSplit[1]+'/'+dateSplit[2]+'/'+dateSplit[0];
    }

    return '';
  }

  public getHour(date:string):string{
    let split =  date.split(' ');
    if(split.length===2){
      let hourSplit = split[1].split(':');
      if(hourSplit.length===3)
        return hourSplit[0]+':'+hourSplit[1];
    }

    return '';
  }
}
