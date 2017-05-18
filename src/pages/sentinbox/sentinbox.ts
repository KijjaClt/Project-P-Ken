import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
/*
  Generated class for the Sentinbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sentinbox',
  templateUrl: 'sentinbox.html'
})
export class SentinboxPage {
advisor : any;
admin_id : any;
text : any;
is_admin = null;
advisorMax = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public str : Storage,private http : Http) {}

  ionViewDidLoad() {
    var getAdvisor = this.navParams.get('advisor');
    if (getAdvisor) {
      this.advisor = getAdvisor
    } else {
      this.str.get('advisor').then((del) => {
        this.advisor = del
      })
  this.str.get('token').then((val) => {
    this.admin_id = val
    this.getAdvisorname().subscribe((data) =>{
       this.advisorMax = data.admin_advisor + data.admin_advisor2
    })
  })
  
  }
  
}
getAdvisorname(){
  return this.http.get('http://angsila.cs.buu.ac.th/~56160355/Project/getAdmin.php?admin_id='+this.admin_id).map((res)=> res.json());
}
add(advisor_id){
  this.str.get('token').then((val) => {
    this.admin_id = val;
    var ia_owner = advisor_id 
    var ia_from = this.admin_id
    var ia_message = this.text
    let Params = "ia_owner=" + ia_owner + "&ia_from=" + ia_from +"&ia_message=" + ia_message; 
    console.log(Params)
    let link = "http://angsila.cs.buu.ac.th/~56160355/Project/add_inbox.php?" + Params;
    this.http.get(link)
      .map (res => res.json() )
      .subscribe(data => {

        this.navCtrl.pop()
      });
  })
} 
}
