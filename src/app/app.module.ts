import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    ConfirmEmailNotificationComponent
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
      { path: '**', component: ErrorPageComponent },
    ]),
    
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
