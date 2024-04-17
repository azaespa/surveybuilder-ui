import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { SurveyFormService } from '../surveyform.service';
import { Surveyform } from '../surveyform';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  fbForm: FormGroup = new FormGroup({});
  textForm: FormGroup = new FormGroup({});
  surveyForm: Surveyform = {
    id: '',
    surveyFormId: '',
    surveyFormName: '',
    questionForm: [{ answerType: '', question: '' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private surveyFormService: SurveyFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSurveyFormById(this.route.snapshot.paramMap.get('id'));

    this.fbForm = this.formBuilder.group({
      questionForms: this.formBuilder.array([]),
    });
  }

  getSurveyFormById(id: String): void {
    this.surveyFormService.getSurveyFormById(id).subscribe({
      next: (result: Surveyform) => {
        this.surveyForm = result;
        this.surveyForm.questionForm.forEach((form) => {
          this.questionForms.push(
            this.formBuilder.group({
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

  createTextForm() {
    this.textForm = this.formBuilder.group({
      question: ['...'],
      answerType: ['text'],
    });

    this.questionForms.push(this.textForm);

    this.surveyForm.questionForm.push(this.textForm.value);

    this.saveChanges();
  }

  createMcForm() {
    this.questionForms.push(
      this.formBuilder.group({
        question: [''],
        answerType: ['multiple-choice'],
        choices: this.formBuilder.group({
          choiceA: [''],
          choiceB: [''],
          choiceC: [''],
          choiceD: [''],
        }),
      })
    );
    console.log(this.questionForms.value);
  }

  updateSurveyForm(updateSurveyForm: Surveyform): void {
    this.surveyFormService
      .updateSurveyForm(updateSurveyForm)
      .subscribe((response) => console.log(response));
  }

  saveChanges() {
    this.updateSurveyForm(this.surveyForm);
  }
}
