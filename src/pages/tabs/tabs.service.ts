import { Injectable } from '@angular/core';
@Injectable()
export class TabService {
    tabsMenu:object ={'HOME':'HOME','CONTACTS':'CONTACTS','INTROS':'INTROS','MESSAGES':'MESSAGES','SETTINGS':'SETTINGS'};
    showTab:boolean;
    constructor() {}

    public getSection(section:string): string {
      if(this.tabsMenu[section]!==undefined)
        return this.tabsMenu[section];
      else
        return '';
    }

    public setMedia(section:string,value:string): void {
      if(this.tabsMenu[section]!==undefined)
        this.tabsMenu[section] = value;
    }

    public getShowTab(): boolean {
      return this.showTab;
    }

    public setShowTab(value:boolean): void {
      this.showTab = value;
      this.changeShowBar();
    }

    private changeShowBar(): void{
      let tabBarElement = document.querySelector('.tabbar');
      if(tabBarElement!==undefined && tabBarElement!==null){
        tabBarElement.className = tabBarElement.className.replace(' hide','');//borramos las clases para evitar una anidacion y asegurar que solo haya 1 show o 1 hide y no ambos a la vez
        if(!this.getShowTab()){
          tabBarElement.className  = tabBarElement.className+ ' hide';
        }

      }
    }
}
