import { Component } from '@angular/core';


import { NavController , AlertController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { NewsPage } from '../news/news';
import { PlanPage } from '../plan/plan';
import { UserData } from '../../providers/user-data';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
  

})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  fetchdata : any;
   token:String;
  
  constructor(
        public navCtrl: NavController,
        public http : Http,
        public alertCtrl:AlertController,
        public userData: UserData,
        public str: Storage

        ) {
      
        }

  
  onLogin() {
    this.submitted = true;
    let username = this.login.username;
    let password = this.login.password;
    let login = "username=" + username + "&password=" + password; 
    let link = "http://angsila.cs.buu.ac.th/~56160355/Project/login.php?" + login;

    this.http.get(link)
      .map (res => res.json() )
      .subscribe(data => {
        if (data == null) {
          let alert = this.alertCtrl.create({
            title: 'แจ้งเตือน',
            subTitle: 'โปรดใส่ user ให้ถูกต้อง!',
            buttons: ['ตกลง']
          });

          alert.present();
        
          return
        }
   this.userData.login(this.login.username);
    this.str.ready().then(() => {
      this.str.set('token',data.admin_id)
      this.str.set('advisor',data.admin_advisor) 
       this.str.set('advisor2',data.admin_advisor2) 
       
  })
        this.navCtrl.setRoot(PlanPage)
      });
  }

}
