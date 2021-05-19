import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { WorkerComponent } from './pages/worker/worker.component';
import { ProjectComponent } from './pages/project/project.component';
import { DepartmentTypeComponent } from './pages/department-type/department-type.component';
import { OperationClaimComponent } from './pages/operation-claim/operation-claim.component';
import { CompensationComponent } from './pages/compensation/compensation.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { ProjectSectionDepartmentComponent } from './pages/project-section-department/project-section-department.component';
import { ProjectSectionComponent } from './pages/project-section/project-section.component';
import { ProjectWorkerComponent } from './pages/project-worker/project-worker.component';
import { ProjectWorkerWorkingTimeComponent } from './pages/project-worker-working-time/project-worker-working-time.component';
import { UserOperationClaimComponent } from './pages/user-operation-claim/user-operation-claim.component';
import { WorkerDepartmentTypesComponent } from './pages/worker-department-types/worker-department-types.component';
import { WorkerSalaryExperiencesComponent } from './pages/worker-salary-experiences/worker-salary-experiences.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    WorkerComponent,
    ProjectComponent,
    DepartmentTypeComponent,
    OperationClaimComponent,
    CompensationComponent,
    SalaryComponent,
    ProjectSectionDepartmentComponent,
    ProjectSectionComponent,
    ProjectWorkerComponent,
    ProjectWorkerWorkingTimeComponent,
    UserOperationClaimComponent,
    WorkerDepartmentTypesComponent,
    WorkerSalaryExperiencesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
