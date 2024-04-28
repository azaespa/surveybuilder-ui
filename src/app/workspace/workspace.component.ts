import { Component, OnInit } from '@angular/core';
import { SurveyFormService } from '../surveyform.service';
import { Surveyform } from '../surveyform';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  public surveyForms: Surveyform[];
  public user: User;

  constructor(
    private surveyFormService: SurveyFormService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (response: User) => {
        this.user = response;
      },
    });
    this.getAllSurveyFormsByUserId(this.route.snapshot.paramMap.get('id'));
  }

  getAllSurveyFormsByUserId(userId: String): void {
    this.surveyFormService.getAllSurveyFormsByUserId(userId).subscribe({
      next: (surveyForms: Surveyform[]) => {
        this.surveyForms = surveyForms;
        console.log(this.surveyForms);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  createSurveyForm(): void {
    this.surveyFormService
      .addSurveyForm({
        questionForms: [
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
