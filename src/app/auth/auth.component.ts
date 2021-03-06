import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  formError: string;
  error: string;
  isLoading: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if(this.form.valid) {
      this.isLoading = true;
      this.auth.login(this.form.get('username').value, this.form.get('password').value).subscribe((res) => {
        this.isLoading = false;
        this.router.navigateByUrl('/orders', {replaceUrl: true});
      }, (err) => {
        this.error = "Wrong username or password";
        this.isLoading = false;
      });
    } else {
      this.formError = "This field is required!"
    }
  }
}
