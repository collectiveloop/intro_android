import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  constructor() { }
  interval:any;
  timeOut:any;
  public prepareWork(params:any): void {
    if(params.function!==undefined && params.duration!==undefined && !isNaN(params.duration)  && params.duration>=0){
      this.interval = setInterval(params.function, params.duration);
    }
  }

  public cancelWork(): void {
    console.log("cancelando work");
    if(this.interval!==undefined && this.interval!==null ){
      clearInterval(this.interval);
    }
  }

  public delay(params:any): void {
    if(params.function!==undefined && params.duration!==undefined && !isNaN(params.duration)  && params.duration>=0){
      this.timeOut = setTimeout(params.function, params.duration);
    }
  }

  public cancelDelay(): void {
    console.log("cancelando DELAY");
    if(this.timeOut!==undefined && this.timeOut!==null ){
      clearTimeout(this.timeOut);
    }
  }

  public cancelAll(): void {
    console.log("cancelando todo");
    this.cancelWork();
    this.cancelDelay();
  }
}
