import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from './user';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiServerUrl = environment.apiBaseUrl;
  public currentUser = new Subject<User>();

  constructor(private http: HttpClient) {}

  getUser(user: User): Observable<User> {
    return this.http.get<User>(
      `${this.apiServerUrl}/users/find/username?u=${user.username}`
    );
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }
}
