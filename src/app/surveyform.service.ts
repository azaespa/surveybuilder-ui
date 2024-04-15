import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Surveyform } from './surveyform';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SurveyFormService {
  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllSurveyForms(): Observable<Surveyform[]> {
    return this.http.get<Surveyform[]>(`${this.apiServerUrl}/surveyforms/all`);
  }
}
