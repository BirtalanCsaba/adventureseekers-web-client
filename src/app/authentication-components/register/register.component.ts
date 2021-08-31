import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/entity/user.entity';
import { PasswordValidators } from 'src/app/common/validation/password.validators';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registrationForm = new FormGroup({
    email: new FormControl('', 
    [
      Validators.required,
      Validators.email
    ]),
    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    firstname: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30)
    ]),
    lastname: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30)
    ]),
    password: new FormControl('',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    confirmpassword: new FormControl('',
    [
      Validators.required
    ]),
    birthdate: new FormControl(new Date(), 
    [
      Validators.required
    ])
  },
  [
    PasswordValidators.matchPassword
  ]);

  get email() {
    return this.registrationForm.get('email');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get firstname() {
    return this.registrationForm.get('firstname');
  }

  get lastname() {
    return this.registrationForm.get('lastname');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmpassword() {
    return this.registrationForm.get('confirmpassword');
  }

  get birthdate() {
    return this.registrationForm.get('birthdate');
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: NotificationService) { }

  ngOnInit(): void {
  }

  createAccount() {
    // create the account if the form is valid
    if (this.registrationForm.valid) {
      let newUser = new User(
        this.username?.value, 
        this.firstname?.value, 
        this.lastname?.value, 
        this.email?.value, 
        this.birthdate?.value,
        this.confirmpassword?.value);
      // register the user
      this.authService.register(newUser)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/confirm-notification']);
          } else {
            this.toastr.showError("Cannot create account", "Adventure Seekers Romania");
          }
        }, (error: Response) => {
          if(error.status == 403)
            this.toastr.showError(error.statusText, "Adventure Seekers Romania");
          else 
            throw error;
        });
    }
  }

}
