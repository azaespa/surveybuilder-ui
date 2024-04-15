import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspaceComponent } from './workspace/workspace.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    FormBuilderComponent,
    WorkspaceComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
