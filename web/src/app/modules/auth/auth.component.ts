import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  form = this.fb.group({
    email: ['asd@asd.de', {
      validators: Validators.compose([
        Validators.required,
        Validators.email
      ]),
      updateOn: 'blur'
    }],
    password: ['123', {
      validators: Validators.compose([
        Validators.required
      ]),
      updateOn: 'blur'
    }],
    rememberMe: [false],
  });

  ngAfterViewInit() {
    Feather.replace();
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  displayFieldCss2(field: string) {
    return {
      'invalid-feedback': this.isFieldValid(field)
    };
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  loading = false
  loaded = false

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

  }

  onSubmit() {
    if (!this.form.valid) {
      console.log('form invalid');
      return
    }

    this.loaded = false;
    this.loading = true
    this.authService.login(this.form.get('email').value, this.form.get('password').value).subscribe(x => {
      console.log('login email: ' + this.form.get('email').value + ' password: ' + this.form.get('password').value + ' rememberMe: ' + this.form.get('rememberMe').value + ' result: ' + x)
      this.router.navigate([''])
      this.loading = false;
      this.loaded = true
    })
  }

  public isAuthorized() {
    return this.authService.isAuthorized();
  }

}
