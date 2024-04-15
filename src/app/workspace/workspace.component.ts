import { Component, OnInit } from '@angular/core';
import { SurveyFormService } from '../surveyform.service';
import { Surveyform } from '../surveyform';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  public surveyForms: Surveyform[];

  constructor(private surveyFormService: SurveyFormService) {}

  ngOnInit(): void {
    this.getAllSurveyForms();
  }

  getAllSurveyForms(): void {
    this.surveyFormService.getAllSurveyForms().subscribe({
      next: (surveyForms: Surveyform[]) => {
        this.surveyForms = surveyForms;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
