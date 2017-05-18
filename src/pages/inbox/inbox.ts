import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SentinboxPage } from '../sentinbox/sentinbox';
/*
  Generated class for the Inbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {
  admin_id:any;
inbox : any;
from : any;
sent : any
is_admin = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http : Http,public str: Storage) {
    
  }
  ionViewDidLoad(){
  
  }

  ionViewDidEnter() {
     this.str.get('token').then((val) => {
       if(val == null){
         this.navCtrl.setRoot(LoginPage)
       }
       })
      this.str.get('token').then((val) => {
      this.admin_id = val
      this.getInbox().subscribe((data) =>{
      this.inbox = data;
      console.log(this.inbox)
     
       
      })
    })
     this.str.get('advisor').then((del) => {
      this.is_admin = del;
  })
  }
  getInbox(){
    return this.http.get('http://angsila.cs.buu.ac.th/~56160355/Project/get_inbox.php?admin_id='+this.admin_id).map((res)=> res.json());
  }
Sent(){
  this.navCtrl.push(SentinboxPage)
}

SentClick(advisor_id,advisor_id2){

  this.navCtrl.push(SentinboxPage, {advisor : advisor_id})
}
text(){

}
}
