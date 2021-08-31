import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../common/entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  /**
   * Logging in with the given credentials.
   * On successful login, adds the access and refresh tokens to the local storage
   * @param credentials The login credentials
   * @returns True on successful login, otherwise false.
   */
  login(credentials: any) {
    return this.http.post(this.API_URL + '/login', 
      JSON.stringify(credentials))
      .pipe(map((response: any) => {
        let result = response;
        if (result && result.access_token && result.refresh_token) {
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('refresh_token', result.refresh_token);
          return true;
        }
        return false;
      }))
      .pipe(catchError(error => {
        throw error;
      }));
  }

  /**
   * Loggs out the user by deleting the access tokens.
   */
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  /**
   * Checks whether the user is logged in.
   * @returns True if the user is logged in, otherwise false.
   */
  isLoggedIn() {
    return tokenNotExpired("access_token");
  }

  /**
   * Getts the current user`s username.
   */
  get currentUser() {
    let token = localStorage.getItem('access_token');
    if (!token) return null;

    return new JwtHelper().decodeToken(token);
  }
  
  /**
   * Registers the new user
   * @param newUser The user to be registered
   */
  register(newUser: User) {
    return this.http.post(
      this.API_URL + "/api/users/register", 
      JSON.stringify(newUser),
      { 
        headers: {'Content-Type':'application/json; charset=utf-8'}, 
        responseType: 'text' 
      })
      .pipe(map((response: any) => {
        let result = response;
        if (result) return true;
        else return false;
      }))
      .pipe(catchError(error => {
        throw error;
      }));
  }

  /**
   * Confirms the given token
   * @param token The token to be confirmed
   */
  confirmToken(token: string) {
    return this.http.post(
      this.API_URL + "/api/users/confirmation/" + token, null
    )
    .pipe(map((response: any) => {
      let result = response;
      if (result) return true;
      else return false;
    }))
    .pipe(catchError(error => {
      console.log(error);
      throw error;
    }));
  }

  resendToken(email: string) {
    return this.http.post(
      this.API_URL + "/api/users/resend/" + email, null
    ).pipe(catchError(error => {
      console.log(error);
      throw error;
    }));
  }

}

