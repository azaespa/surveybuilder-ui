import { Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';

export const routes: Routes = [
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'form-builder/:id', component: FormBuilderComponent },
];
