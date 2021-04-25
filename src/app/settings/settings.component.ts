import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isLoading: boolean;
  formError: string;
  error: string;
  message: string;

  form: FormGroup;

  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.form = new FormGroup({
      oldpass: new FormControl('', Validators.required),
      newpass: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if(this.form.valid) {
      this.isLoading = true;
      this.http.post(`${environment.ORDERS_API}/auth/change`, {
        oldPassword: this.form.get('oldpass').value, 
        newPassword: this.form.get('newpass').value,
        id: this.auth.user.value.userId
    }).subscribe((res: any) => {
      this.message = res.message;
      this.error = null;
      this.isLoading = false;
    }, (err) => {
      this.message = null;
      this.error = err.error.message;
      this.isLoading = false;
    });
    } else {
      this.isLoading = false;
      this.formError = "This field is required!"
    }
  }

}
