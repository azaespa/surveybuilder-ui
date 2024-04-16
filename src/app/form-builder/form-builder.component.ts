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
  surveyForm: Surveyform = {
    id: '',
    surveyFormId: '',
    surveyFormName: '',
    questionForm: [{ answerType: '', question: '' }],
  };

  private paramSurveyFormId: String;

  constructor(
    private formBuilder: FormBuilder,
    private surveyFormService: SurveyFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // last save in db will be here
    //
    this.paramSurveyFormId = this.route.snapshot.paramMap.get('id');
    this.getSurveyFormById(this.paramSurveyFormId);

    this.fbForm = this.formBuilder.group({
      questionForms: this.formBuilder.array([
        this.formBuilder.group({
          question: [''],
          answerType: ['multiple-choice'],
          choices: this.formBuilder.group({
            choiceA: [''],
            choiceB: [''],
            choiceC: [''],
            choiceD: [''],
          }),
        }),
      ]),
    });
  }

  getSurveyFormById(id: String): void {
    this.surveyFormService.getSurveyFormById(id).subscribe({
      next: (result: Surveyform) => {
        this.surveyForm = result;
      },
    });
  }

  get questionForms(): FormArray {
    return this.fbForm.controls['questionForms'] as FormArray;
  }

  createTextForm() {
    this.questionForms.push(
      this.formBuilder.group({
        question: [''],
        answerType: ['text'],
      })
    );
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
}
