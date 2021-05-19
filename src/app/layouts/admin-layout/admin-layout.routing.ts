import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CompensationComponent } from 'src/app/pages/compensation/compensation.component';
import { DepartmentTypeComponent } from 'src/app/pages/department-type/department-type.component';
import { OperationClaimComponent } from 'src/app/pages/operation-claim/operation-claim.component';
import { ProjectComponent } from 'src/app/pages/project/project.component';
import { ProjectSectionComponent } from 'src/app/pages/project-section/project-section.component';
import { ProjectSectionDepartmentComponent } from 'src/app/pages/project-section-department/project-section-department.component';
import { ProjectWorkerComponent } from 'src/app/pages/project-worker/project-worker.component';
import { ProjectWorkerWorkingTimeComponent } from 'src/app/pages/project-worker-working-time/project-worker-working-time.component';
import { UserOperationClaimComponent } from 'src/app/pages/user-operation-claim/user-operation-claim.component';
import { WorkerComponent } from 'src/app/pages/worker/worker.component';
import { WorkerDepartmentTypesComponent } from 'src/app/pages/worker-department-types/worker-department-types.component';
import { WorkerSalaryExperiencesComponent } from 'src/app/pages/worker-salary-experiences/worker-salary-experiences.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'compensations',  component: CompensationComponent },
    { path: 'department-types',component: DepartmentTypeComponent },
    { path: 'operation-claim',component: OperationClaimComponent },
    { path: 'project',        component: ProjectComponent },
    { path: 'project-section',component: ProjectSectionComponent },
    { path: 'project-section-department', component: ProjectSectionDepartmentComponent },
    { path: 'project-worker', component: ProjectWorkerComponent },
    { path: 'project-worker-working-time',component: ProjectWorkerWorkingTimeComponent },
    { path: 'user-operation-claim', component: UserOperationClaimComponent },
    { path: 'worker',         component: WorkerComponent },
    { path: 'worker-department-types', component: WorkerDepartmentTypesComponent },
    { path: 'worker-salary-experiences', component: WorkerSalaryExperiencesComponent },
];
