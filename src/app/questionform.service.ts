import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Questionform } from './surveyform';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionformService {
  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  addQuestionForm(
    surveyFormId: String,
    questionForm: Questionform
  ): Observable<Questionform> {
    return this.http.post<Questionform>(
      `${this.apiServerUrl}/questionforms/${surveyFormId}/add`,
      questionForm
    );
  }

  getAllQuestionFormBySurveyFormId(
    surveyFormId: String
  ): Observable<Questionform[]> {
    return this.http.get<Questionform[]>(
      `${this.apiServerUrl}/questionforms/${surveyFormId}/all`
    );
  }
}
