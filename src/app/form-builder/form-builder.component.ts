import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { SurveyFormService } from '../surveyform.service';
import { Questionform, Surveyform } from '../surveyform';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionformService } from '../questionform.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  fbForm: FormGroup = new FormGroup({});
  textForm: FormGroup = new FormGroup({});
  mcForm: FormGroup = new FormGroup({});
  surveyFormId: String;

  constructor(
    private formBuilder: FormBuilder,
    private surveyFormService: SurveyFormService,
    private questionFormService: QuestionformService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveyFormId = this.route.snapshot.paramMap.get('id');

    this.fbForm = this.formBuilder.group({
      questionForms: this.formBuilder.array([]),
    });

    this.getAllQuestionFormBySurveyFormId(this.surveyFormId);
  }

  getAllQuestionFormBySurveyFormId(id: String): void {
    this.questionFormService.getAllQuestionFormBySurveyFormId(id).subscribe({
      next: (questionForms: Questionform[]) => {
        questionForms.forEach((form) => {
          this.questionForms.push(
            this.formBuilder.group({
              id: [form.id],
              question: [form.question],
              answerType: [form.answerType],
            })
          );
        });
      },
    });
  }

  get questionForms(): FormArray {
    return this.fbForm.controls['questionForms'] as FormArray;
  }

  addNewQuestionForm(surveyFormId: String, questionForm: Questionform) {
    this.questionFormService
      .addQuestionForm(surveyFormId, questionForm)
      .subscribe((response) => {
        this.textForm = this.formBuilder.group({
          id: response.id,
          question: response.question,
          answerType: response.answerType,
          choicesForms: response.choicesForms,
        });

        this.questionForms.push(this.textForm);
      });
  }

  createTextForm() {
    const newTextForm: Questionform = {
      question: '...',
      answerType: 'text',
    };

    this.addNewQuestionForm(this.surveyFormId, newTextForm);
  }
}
