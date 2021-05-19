import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectSectionDepartment } from '../models/projectSectionDepartments/projectSectionDepartment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectSectionDepartmentService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(projectSectionDepartment:ProjectSectionDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectSectionDepartments/add",projectSectionDepartment);
  }

  delete(projectSectionDepartment:ProjectSectionDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectSectionDepartments/delete",projectSectionDepartment);
  }

  update(projectSectionDepartment:ProjectSectionDepartment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectSectionDepartments/update",projectSectionDepartment);
  }
  // burada bir sectionun birden fazla departmentı gelicek ondan kaynaklı list olucak.
  getBySectionID(sectionID:number): Observable<ListResponseModel<ProjectSectionDepartment>>{
    let newPath = this.apiUrl + "projectSectionDepartments/getbysectionid?sectionID="+sectionID;
    return this.httpClient.get<ListResponseModel<ProjectSectionDepartment>>(newPath);
  }
}