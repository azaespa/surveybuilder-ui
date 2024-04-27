import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUser(user: User) {
    return this.http.get(
      `${this.apiServerUrl}/users/find/username?u=${user.username}`
    );
  }
}
