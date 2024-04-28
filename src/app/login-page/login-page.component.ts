import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public user: User;
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login(): void {
    this.user = this.loginForm.value;
    if (this.user.username.length < 5 || this.user.username.includes(' ')) {
      return alert('Please enter a valid username');
    } else if (this.user.password.length < 8) {
      return alert('Please enter a valid password');
    }

    this.userService.getUser(this.user).subscribe({
      next: (result: User) => {
        if (this.user.password != result.password) {
          return alert('Please enter a correct password');
        }

        console.log(result);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.error.message);
      },
    });
  }
}
