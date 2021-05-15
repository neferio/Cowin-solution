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
  title = 'cowin';
  pincode:string="";
  centres: Array<Centre>;
  dateString:string;
  constructor(private httpClient:HttpClient){}
  ngOnInit(){
    this.centres=[];
     
    this.dateString=this.dateStringConversion();
    
  }
  dateStringConversion(){
    let date: Date = new Date(); 
    let date1:number=date.getDate();
    let month:number=date.getMonth()+1;

    let stringDate1='';
    if(date1/10 === 0){
      stringDate1='0'+date1;
    }
    else{
      stringDate1=date1.toString();
    }

    let stringMonth=''
    if((month/10) < 1){

      stringMonth='0'+month;
    }
    else{
      stringMonth=month.toString();

    }

    let finalDateString=stringDate1+"-"+stringMonth+"-2021"

    return finalDateString;

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
    this.httpClient.get<any>(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${this.dateString}`).subscribe(data=>{
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

      })
  }
  getSlots(x):any{
      let arr=[];

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
