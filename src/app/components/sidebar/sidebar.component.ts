import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/compensations', title: 'Compensations',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/department-types', title: 'Department Types',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/operation-claim', title: 'Operation Claims',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/project', title: 'Projects',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/project-section', title: 'Project Sections',  icon:'ni-key-25 text-info', class: '' },
    { path: '/project-section-department', title: 'Project Section Departments',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/project-worker', title: 'Project Workers',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/project-worker-working-time', title: 'Project Worker Working Times',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-operation-claim', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/worker', title: 'Workers',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/worker-department-types', title: 'Worker Department Types',  icon:'ni-key-25 text-info', class: '' },
    { path: '/worker-salary-experiences', title: 'Worker Salary Experiences',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}