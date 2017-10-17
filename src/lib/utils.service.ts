import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
    constructor() {}

    public getCropName(name:string): string {
        let finalName='';
        if(typeof name=='string' && name!==''){
            finalName = name.replace(/ /g,'_').replace(/_/g,'-').toLowerCase();
        }
        return finalName;
    }
}
