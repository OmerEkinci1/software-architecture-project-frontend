import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompensationComponent } from 'src/app/pages/compensation/compensation.component';
import { DepartmentTypeComponent } from 'src/app/pages/department-type/department-type.component';
import { UserOperationClaimComponent } from 'src/app/pages/user-operation-claim/user-operation-claim.component';
import { OperationClaimComponent } from 'src/app/pages/operation-claim/operation-claim.component';
import { ProjectComponent } from 'src/app/pages/project/project.component';
import { ProjectSectionComponent } from 'src/app/pages/project-section/project-section.component';
import { ProjectSectionDepartmentComponent } from 'src/app/pages/project-section-department/project-section-department.component';
import { ProjectWorkerComponent } from 'src/app/pages/project-worker/project-worker.component';
import { ProjectWorkerWorkingTimeComponent } from 'src/app/pages/project-worker-working-time/project-worker-working-time.component';
import { SalaryComponent } from 'src/app/pages/salary/salary.component';
import { WorkerComponent } from 'src/app/pages/worker/worker.component';
import { WorkerDepartmentTypesComponent } from 'src/app/pages/worker-department-types/worker-department-types.component';
import { WorkerSalaryExperiencesComponent } from 'src/app/pages/worker-salary-experiences/worker-salary-experiences.component';
import { BrowserModule } from '@angular/platform-browser';
import { FilterPipePipe } from 'src/app/pipes/filter-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    CompensationComponent,
    DepartmentTypeComponent,
    UserOperationClaimComponent,
    OperationClaimComponent,
    ProjectComponent,
    ProjectSectionComponent,
    ProjectSectionDepartmentComponent,
    ProjectWorkerComponent,
    ProjectWorkerWorkingTimeComponent,
    SalaryComponent,
    WorkerComponent,
    WorkerDepartmentTypesComponent,
    WorkerSalaryExperiencesComponent,
    UserProfileComponent,
    FilterPipePipe,
  ],

})

export class AdminLayoutModule {}
