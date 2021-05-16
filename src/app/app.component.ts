import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

export interface Centre{
  name:string,
  slotAvail:Array<number>,
  sum:number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  show:boolean=false;
  isRealTime:boolean=false;
  isOneTime:boolean=false;
  constructor(){

  }
  ngOnInit(){

  }
  startRealTimeModel(){
    this.show=true;
    this.isOneTime=false;
    this.isRealTime=true;

  }
  startOneTimeModel(){
    this.show=true;
    
    this.isRealTime=false;
    this.isOneTime=true;
  }
}
