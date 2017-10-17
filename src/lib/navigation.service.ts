import { Injectable  } from '@angular/core';

@Injectable()
export class NavigationService {
    constructor() {}

    public navigateExternal(route:any): void {
        if(typeof route=='object' && route.url!==undefined && route.url!==null){
            if(route.target!==undefined && route.target!==null && route.target!=='self')
                window.open(route.url);
            else
                document.location.href = route.url;
        }
    }



}
