import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideoManagerService } from '../services/videos-manager.service';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SearchVideosPage } from '../pages/search-videos/search-videos';
import { YoutubeManagerService } from '../services/youtube-manager.service';
import { EditGroupPage } from '../pages/edit-group/edit-group';
import { LoginPage } from '../pages/login/login';
import { UserManagerProvider } from '../services/user-manager';
import { GroupsManagerService } from '../services/groups-manager.service';
import {GroupComponent} from "../components/group/group";
import {SearchComponent} from "../components/search/search";
import {SearchUsersPage} from "../pages/search-users/search-users";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchVideosPage,
    SearchUsersPage,
    EditGroupPage,
    LoginPage,
    GroupComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'PlayShare'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchVideosPage,
    SearchUsersPage,
    EditGroupPage,
    LoginPage,
    GroupComponent,
    SearchComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VideoManagerService,
    YoutubeManagerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserManagerProvider,
    GroupsManagerService
  ]
})
export class AppModule {}
