import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { CompensationComponent } from 'src/app/pages/compensation/compensation.component';
import { DepartmentTypeComponent } from 'src/app/pages/department-type/department-type.component';
import { OperationClaimComponent } from 'src/app/pages/operation-claim/operation-claim.component';
import { ProjectComponent } from 'src/app/pages/project/project.component';
import { ProjectWorkerWorkingTimeComponent } from 'src/app/pages/project-worker-working-time/project-worker-working-time.component';
import { WorkerComponent } from 'src/app/pages/worker/worker.component';
import { WorkerDepartmentTypesComponent } from 'src/app/pages/worker-department-types/worker-department-types.component';
import { WorkerSalaryExperiencesComponent } from 'src/app/pages/worker-salary-experiences/worker-salary-experiences.component';
import { SalaryComponent } from 'src/app/pages/salary/salary.component';
import { ProjectDetailsComponent } from 'src/app/pages/project-details/project-details.component';
import { ProjectWorkerComponent } from 'src/app/pages/project-worker/project-worker.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'compensations',  component: CompensationComponent },
    { path: 'salary',  component: SalaryComponent },
    { path: 'department-types',component: DepartmentTypeComponent },
    { path: 'operation-claim',component: OperationClaimComponent },
    { path: 'project',        component: ProjectComponent },
    { path: 'project-worker',        component: ProjectWorkerComponent },
    { path: 'project-details/:id',        component: ProjectDetailsComponent },
    { path: 'project-worker-working-time',component: ProjectWorkerWorkingTimeComponent },
    { path: 'worker',         component: WorkerComponent },
    { path: 'worker-department-types', component: WorkerDepartmentTypesComponent },
    { path: 'worker-salary-experiences', component: WorkerSalaryExperiencesComponent },
];
