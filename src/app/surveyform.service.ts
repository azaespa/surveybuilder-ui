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

  addSurveyForm(surveyForm: Surveyform): Observable<Surveyform> {
    return this.http.post<Surveyform>(
      `${this.apiServerUrl}/surveyforms/add`,
      surveyForm
    );
  }

  getAllSurveyForms(): Observable<Surveyform[]> {
    return this.http.get<Surveyform[]>(`${this.apiServerUrl}/surveyforms/all`);
  }

  getSurveyFormById(id: String): Observable<Surveyform> {
    return this.http.get<Surveyform>(
      `${this.apiServerUrl}/surveyforms/find/${id}`
    );
  }

  updateSurveyForm(updateSurveyForm: Surveyform): Observable<Surveyform> {
    return this.http.put<Surveyform>(
      `${this.apiServerUrl}/surveyforms/update`,
      updateSurveyForm
    );
  }

  updateQuestionForm(
    updateQuestionForm: Questionform
  ): Observable<Questionform> {
    return this.http.put<Questionform>(
      `${this.apiServerUrl}/questionforms/update`,
      updateQuestionForm
    );
  }
}
