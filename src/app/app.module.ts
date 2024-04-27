import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspaceComponent } from './workspace/workspace.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    FormBuilderComponent,
    WorkspaceComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
