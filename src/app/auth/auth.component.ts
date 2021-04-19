import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if(this.form.valid) {
      console.log("HELLO");
      console.log(this.form.value);
    } else {
      this.formError = "This field is required!"
    }
  }

}
