import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questionform, Surveyform } from './surveyform';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SurveyFormService {
  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  addSurveyForm(
    userId: String,
    surveyForm: Surveyform
  ): Observable<Surveyform> {
    return this.http.post<Surveyform>(
      `${this.apiServerUrl}/surveyforms/${userId}/add`,
      surveyForm
    );
  }

  getAllSurveyFormByUserId(userId: String): Observable<Surveyform[]> {
    return this.http.get<Surveyform[]>(
      `${this.apiServerUrl}/surveyforms/${userId}/all`
    );
  }

  updateSurveyForm(updateSurveyForm: Surveyform): Observable<Surveyform> {
    return this.http.put<Surveyform>(
      `${this.apiServerUrl}/surveyforms/update`,
      updateSurveyForm
    );
  }
}
