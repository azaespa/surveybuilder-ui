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
  public userId: String;

  constructor(
    private surveyFormService: SurveyFormService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getAllSurveyFormsByUserId(this.userId);
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
      .addSurveyForm(this.userId, {
        questionForms: [],
      })
      .subscribe((surveyForm) => {
        this.router.navigate(['/form-builder', surveyForm.id]);
      });
  }
}
