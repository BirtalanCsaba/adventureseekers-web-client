import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../common/entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient) { }

  existsEmail(email: string) {
    let httpParams = new HttpParams().append("email", email);
    return this.http.get(
      this.API_URL + "/api/users/checkEmail",
      {
        params: httpParams
      }
    )
    .pipe(map((response: any) => {
      let result = response.success;
      if (result) return true;
      else return false;
    }))
    .pipe(catchError(error => {
      console.log(error);
      throw error;
    }));
  }

  existsUsername(username: string) {
    let httpParams = new HttpParams().append("username", username);
    return this.http.get(
      this.API_URL + "/api/users/checkUsername",
      {
        params: httpParams
      }
    )
    .pipe(map((response: any) => {
      let result = response.success;
      if (result) return true;
      else return false;
    }))
    .pipe(catchError(error => {
      console.log(error);
      throw error;
    }));
  }

  getUser(username: string) {
    return this.http.get(this.API_URL + "/api/users/" + username)
      .pipe(map((response: any) => {
        return response;
      }))
      .pipe(catchError(error => {
        console.log(error);
        throw error;
      }));
  }

  getUserDetails(username: string) {
    return this.http.get(this.API_URL + "/api/users/details/" + username)
    .pipe(map((response: any) => {
      return response;
    }))
    .pipe(catchError(error => {
      console.log(error);
      throw error;
    }));
  }

  patchUser(username: string, data: any) {
    return this.http.patch(
      this.API_URL + "/api/users/" + username,
      JSON.stringify(data))
      .pipe(map((response: any) => {
        return response;
      }))
      .pipe(catchError(error => {
        throw error;
      }));
  }

  patchUserDetails(username: string, data: any) {
    return this.http.patch(
      this.API_URL + "/api/users/details/" + username,
      JSON.stringify(data))
      .pipe(map((response: any) => {
        return response;
      }))
      .pipe(catchError(error => {
        throw error;
      }));
  }

}
