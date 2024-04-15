import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  fbForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // last save in db will be here
    //
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
