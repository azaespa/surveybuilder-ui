import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
  question: string = 'test';
  ngOnInit(): void {}
}
