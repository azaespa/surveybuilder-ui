import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { SurveyFormService } from '../surveyform.service';
import { Questionform, Surveyform } from '../surveyform';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  fbForm: FormGroup = new FormGroup({});
  textForm: FormGroup = new FormGroup({});
  mcForm: FormGroup = new FormGroup({});
  surveyForm: Surveyform = {
    id: '',
    surveyFormName: '',
    questionForms: [
      {
        id: '',
        answerType: '',
        question: '',
      },
    ],
  };
  surveyFormId: String;

  constructor(
    private formBuilder: FormBuilder,
    private surveyFormService: SurveyFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveyFormId = this.route.snapshot.paramMap.get('id');

    this.fbForm = this.formBuilder.group({
      questionForms: this.formBuilder.array([]),
    });

    this.getSurveyFormById(this.surveyFormId);
  }

  getSurveyFormById(id: String): void {
    this.surveyFormService.getSurveyFormById(id).subscribe({
      next: (result: Surveyform) => {
        this.surveyForm = result;
        this.surveyForm.questionForms.forEach((form) => {
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
    this.surveyFormService
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

  createMcForm() {
    this.mcForm = this.formBuilder.group({
      question: [''],
      answerType: ['multiple-choice'],
      choices: this.formBuilder.group({
        choiceA: [''],
        choiceB: [''],
        choiceC: [''],
        choiceD: [''],
      }),
    });

    this.questionForms.push(this.mcForm);
    this.surveyForm.questionForms.push(this.mcForm.value);

    this.saveChanges();
  }

  updateSurveyForm(updateSurveyForm: Surveyform): void {
    this.surveyFormService
      .updateSurveyForm(updateSurveyForm)
      .subscribe((response) => console.log(response));
  }

  updateQuestionForm(updateQuestionForm: Questionform): void {
    this.surveyFormService
      .updateQuestionForm(updateQuestionForm)
      .subscribe((response) => console.log(response));
  }

  saveChanges() {
    this.updateSurveyForm(this.surveyForm);
  }
}
