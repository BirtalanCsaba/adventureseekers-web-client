import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppErrorHandler } from './common/app-error-handler';
import { LoginComponent } from './authentication-components/login/login.component';
import { RegisterComponent } from './authentication-components/register/register.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfirmEmailComponent } from './authentication-components/confirm-email/confirm-email.component';
import { ConfirmEmailNotificationComponent } from './authentication-components/confirm-email-notification/confirm-email-notification.component';
import { ErrorPageComponent } from './shared-components/error-page/error-page.component';
import { UserProfileComponent } from './account/settings/user-profile/user-profile.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManageComponent } from './account/user-manage/user-manage.component';
import { MyAccountComponent } from './account/settings/my-account/my-account.component';
import { SecurityComponent } from './account/settings/security/security.component';
import { EmailNotificationsComponent } from './account/settings/email-notifications/email-notifications.component';
import { CookiesComponent } from './account/settings/cookies/cookies.component';
import { LanguageComponent } from './account/settings/language/language.component';
import { AddsComponent } from './account/settings/adds/adds.component';
import { SupportComponent } from './account/settings/support/support.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ConfirmEmailNotificationComponent,
    UserProfileComponent,
    SecurityComponent,
    UserManageComponent,
    EmailNotificationsComponent,
    CookiesComponent,
    LanguageComponent,
    SupportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent }, 
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'confirm/:token', component: ConfirmEmailComponent },
      { path: 'confirm-notification', component: ConfirmEmailNotificationComponent },
      { 
        path: 'settings/account', 
        component: UserManageComponent,
        canActivate: [AuthGuard],
        children:[
          {
            path: '',
            component: MyAccountComponent
          },
          {
            path: 'security',
            component: SecurityComponent
          },
          {
            path: 'email-notifications',
            component: EmailNotificationsComponent
          },
          {
            path: 'cookies',
            component: CookiesComponent
          },
          {
            path: 'language',
            component: LanguageComponent
          },
          {
            path: 'adds',
            component: AddsComponent
          },
          {
            path: 'support',
            component: SupportComponent
          }
        ]
      },
      { 
        path: 'profile', 
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      },
      { path: '**', component: ErrorPageComponent },
    ]),
    
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
