import { Component, OnInit } from '@angular/core';
import { SurveyFormService } from '../surveyform.service';
import { Surveyform } from '../surveyform';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  public surveyForms: Surveyform[];

  constructor(
    private surveyFormService: SurveyFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  createSurveyForm(): void {
    this.surveyFormService
      .addSurveyForm({
        questionForm: [
          {
            answerType: 'text',
            question: '...',
          },
        ],
      })
      .subscribe((surveyForm) => {
        this.surveyForms.push(surveyForm);
        this.router.navigate(['/form-builder', surveyForm.id]);
      });
  }
}
