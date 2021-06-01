import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectSectionDto } from '../models/projectSections/porjectSectionDto';
import { ProjectSection } from '../models/projectSections/projectSection';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectSectionsService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(projectSection:ProjectSection): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectsections/add",projectSection);
  }

  delete(projectSection:ProjectSection): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectsections/delete",projectSection);
  }

  update(projectSection:ProjectSection): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectsections/update",projectSection);
  }

  getByProjectID(ProjectID:number): Observable<ListResponseModel<ProjectSection>>{
    let newPath = this.apiUrl + "projectsections/getbyprojectid?projectID="+ProjectID;
    return this.httpClient.get<ListResponseModel<ProjectSection>>(newPath);
  }

  getAll(): Observable<ListResponseModel<ProjectSectionDto>>{
    return this.httpClient.get<ListResponseModel<ProjectSectionDto>>(this.apiUrl + "projectsections/getall");
  }
}
