import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UserDetail } from 'src/app/common/entity/user-detail.entity';
import { User } from 'src/app/common/entity/user.entity';
import { GlobalValidators } from 'src/app/common/validation/global.validators';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  private initialUser = new User();
  private initialUserDetail = new UserDetail();

  settingsForm = new FormGroup({
    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      GlobalValidators.cannotContainSpace
    ]),
    email: new FormControl('',
    [
      GlobalValidators.cannotContainSpace,
      Validators.required,
      Validators.email,
    ]),
    firstname: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      GlobalValidators.shouldNotStartOrEndWithWhitespace
    ]),
    lastname: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      GlobalValidators.shouldNotStartOrEndWithWhitespace
    ]),
    birthdate: new FormControl('',
    [
      Validators.required,
      GlobalValidators.shouldNotStartOrEndWithWhitespace,
    ]),
    country: new FormControl('',
    [
      GlobalValidators.shouldNotStartOrEndWithWhitespace,
      Validators.maxLength(50),
      Validators.minLength(1),
    ]),
    county: new FormControl('',
    [
      GlobalValidators.shouldNotStartOrEndWithWhitespace,
      Validators.maxLength(50),
      Validators.minLength(1),
    ]),
    city: new FormControl('',
    [
      GlobalValidators.shouldNotStartOrEndWithWhitespace,
      Validators.maxLength(50),
      Validators.minLength(1),
    ])
  });

  get email() {
    return this.settingsForm.get('email');
  }

  get username() {
    return this.settingsForm.get('username');
  }

  get firstname() {
    return this.settingsForm.get('firstname');
  }

  get lastname() {
    return this.settingsForm.get('lastname');
  }

  get birthdate() {
    return this.settingsForm.get('birthdate');
  }

  get country() {
    return this.settingsForm.get('country');
  }

  get county() {
    return this.settingsForm.get('county');
  }

  get city() {
    return this.settingsForm.get('city');
  }

  constructor(
      private userService: UserService,
      private authService: AuthService,
      private toastr: NotificationService) { }

  ngOnInit(): void {
      forkJoin([
          this.userService.getUser(this.authService.currentUser.sub),
          this.userService.getUserDetails(this.authService.currentUser.sub)
      ])
      .subscribe(result => {
        this.initialUser = result[0];
        this.email?.patchValue(result[0].Email);
        this.username?.patchValue(result[0].UserName);
        this.firstname?.patchValue(result[0].FirstName);
        this.lastname?.patchValue(result[0].LastName);
        this.birthdate?.patchValue(result[0].BirthDate);

        this.initialUserDetail = result[1];
        this.country?.patchValue(result[1].Country ? result[1].Country : "");
        this.county?.patchValue(result[1].County ? result[1].County : "");
        this.city?.patchValue(result[1].City ? result[1].City : "");
      });
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      let userData = new User();
      let userDetailData = new UserDetail();

      let needUpdate = false;
      if (this.initialUser.Email !== this.email?.value) {
        userData.Email = this.email?.value;
        this.initialUser.Email = this.email?.value;
        needUpdate = true;
      }

      if (this.initialUser.UserName !== this.username?.value) {
        userData.UserName = this.username?.value;
        this.initialUser.UserName = this.username?.value;
        needUpdate = true;
      }

      if (this.initialUser.FirstName !== this.firstname?.value) {
        userData.FirstName = this.firstname?.value;
        this.initialUser.FirstName = this.firstname?.value;
        needUpdate = true;
      }
      
      if (this.initialUser.LastName !== this.lastname?.value) {
        userData.LastName = this.lastname?.value;
        this.initialUser.LastName = this.lastname?.value;
        needUpdate = true;
      }
      
      if (this.initialUser.BirthDate !== this.birthdate?.value) {
        userData.BirthDate = this.birthdate?.value;
        this.initialUser.BirthDate = this.birthdate?.value;
        needUpdate = true;
      }
      
      if (this.initialUserDetail.Country !== this.country?.value) {
        userDetailData.Country = this.country?.value;
        this.initialUserDetail.Country = this.country?.value;
        needUpdate = true;
      }
      
      if (this.initialUserDetail.County !== this.county?.value) {
        userDetailData.County = this.county?.value;
        this.initialUserDetail.County = this.county?.value;
        needUpdate = true;
      }
      
      if (this.initialUserDetail.City !== this.city?.value) {
        userDetailData.City = this.city?.value;
        this.initialUserDetail.City = this.city?.value;
        needUpdate = true;
      }

      if (needUpdate) {
        forkJoin([
          this.userService.patchUser(this.initialUser.UserName ? this.initialUser.UserName : "", userData),
          this.userService.patchUserDetails(this.initialUser.UserName ? this.initialUser.UserName : "", userDetailData)
        ])
        .subscribe(response => {
          this.toastr.showSuccess("Settings saved", "Adventure Seekers");
        });
      }
      else {
        this.toastr.showInfo("No need to update", "Adventure Seekers");
      }
      

      
    }
  }

  deleteAccount() {
    console.log("deleting account");
  }

}
