import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/entity/user.entity';
import { EmailValidators } from 'src/app/common/validation/email.validators';
import { GlobalValidators } from 'src/app/common/validation/global.validators';
import { UsernameValidators } from 'src/app/common/validation/username.validators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  private usernameInitValue: string | undefined;
  private emailInitValue: string | undefined;
  private firstNameInitValue: string | undefined;
  private lastNameInitValue: string | undefined;
  private birthDateInitValue: string | undefined;
  private countryInitValue: string | undefined;
  private countyInitValue: string | undefined;
  private cityInitValue: string | undefined;

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
      private authService: AuthService) { }

  ngOnInit(): void {
      this.userService.getUser(this.authService.currentUser.sub)
        .subscribe((result: any) => {
          this.email?.patchValue(result.email);
          this.username?.patchValue(result.userName);
          this.firstname?.patchValue(result.firstName);
          this.lastname?.patchValue(result.lastName);
          this.birthdate?.patchValue(new Date(result.birthDate));
        });
      this.userService.getUserDetails(this.authService.currentUser.sub)
        .subscribe((result: any) => {
          this.country?.patchValue(result.country ? result.country : "");
          this.county?.patchValue(result.county ? result.county : "");
          this.city?.patchValue(result.city ? result.city : "");
        });
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      let userData = new User();
      
    }
  }

  deleteAccount() {
    console.log("deleting account");
  }

}
