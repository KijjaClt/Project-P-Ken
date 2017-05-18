import { Component } from '@angular/core';
import { NavController ,  NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { SimisumPage } from '../simisum/simisum';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {
  fullHour:String
event : any = [];
out : Object;
shownSessions: any = [];
 admin_id:any;
segment: string = "inClass";
hour:any;
session:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,private http : Http, public str: Storage) {
   
  }

  ionViewDidEnter() {
       this.str.get('token').then((val) => {
       if(val == null){
         this.navCtrl.setRoot(LoginPage)
       }
       })
     this.str.get('token').then((val) => {
         this.admin_id = val
    this.Getevent().subscribe((data) =>{
       this.shownSessions = data.shownSessions;
      this.event = data;
      console.log(this.event);
      console.log(this.shownSessions);
    })
  })
    this.str.get('token').then((val) => {
      this.admin_id = val
      this.Getout().subscribe((data) =>{
        this.out = data;
        console.log(this.out);
    })})
  }

  Getout(){
       return this.http.get('http://angsila.cs.buu.ac.th/~56160355/Project/get_out_time.php?admin_id='+this.admin_id).map((res)=> res.json());
  }
  Getevent(){
       return this.http.get('http://angsila.cs.buu.ac.th/~56160355/Project/get_time.php?admin_id='+this.admin_id).map((res)=> res.json());
  }
  ionViewDidLoad() {
     
  }
  add(item){
    this.navCtrl.push(SimisumPage, {item: item})
  }


}
