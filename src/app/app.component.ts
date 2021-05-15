import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { summaryFileName } from '@angular/compiler/src/aot/util';

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
  title = 'cowin';
  pincode:string="";
  centres: Array<Centre>;
  constructor(private httpClient:HttpClient){}
  ngOnInit(){
    this.centres=[]
    
    
  }
  myVar:any;
  start(pincode){
    clearInterval(this.myVar);
    this.goApi(pincode);
    this.myVar = setInterval(()=>{
      this.goApi(pincode)
    },5000)
  }
  goApi(pincode){
    this.httpClient.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=${pincode}&date=15-05-2021`).subscribe(data=>{
        data=data.centers;
        this.centres= data.map(x=>{
          let slots=this.getSlots(x.sessions);
          let sum=this.getSum(slots);
          return <Centre>
          {
            name:x.name,
            slotAvail:slots,
            sum:sum

          }
        })
        console.log(this.centres)
      })
  }
  getSlots(x):any{
      let arr=[];
      console.log(x);
      for( let i in x){

        if(x[i].min_age_limit === 18){
        arr.push(x[i].available_capacity)
        }
      }
      return arr;
  }

  getSum(x){
    if(x && x.length>0){
      let sum=0;
      for(let i in x){
        sum+=x[i];
      }
      return sum;
    }
    return 0;
    
  }
}
