import { NgModule, ErrorHandler } from '@angular/core';
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicApp, IonicModule,IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SimisumPage } from '../pages/simisum/simisum';
import { ConferenceApp } from './app.component';
import { CalendarPage } from '../pages/calendar/calendar';


import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SentinboxPage } from '../pages/sentinbox/sentinbox';
import { InboxPage } from '../pages/inbox/inbox';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { TeacherPage } from '../pages/teacher/teacher';
import { EventPage } from '../pages/event/event';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { PlanPage } from '../pages/plan/plan';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { NewsPage } from '../pages/news/news';
import { CloudSettings,CloudModule } from '@ionic/cloud-angular';
import { Push,PushToken } from '@ionic/cloud-angular';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '83e6d7c1'
  },
  'push': {
    'sender_id': '20487621850',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    ConferenceApp,
    
    AccountPage,
    LoginPage,
    MapPage,
    InboxPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    TeacherPage,
    CalendarPage,
    EventPage,
    PlanPage,
    SimisumPage,
    NewsPage,
    SentinboxPage
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(ConferenceApp),
		IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
   
    AccountPage,
    LoginPage,
    MapPage,
    InboxPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    TeacherPage,
    CalendarPage,
    EventPage,
    PlanPage,
    SimisumPage,
    NewsPage,
    SentinboxPage
  ],
  providers: [
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    SecureStorage,
    
  ]
})
export class AppModule { }
