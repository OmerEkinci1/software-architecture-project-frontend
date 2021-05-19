import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectSection } from '../models/projectSections/projectSection';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectSectionsService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(projectSection:ProjectSection): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectSections/add",projectSection);
  }

  delete(projectSection:ProjectSection): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectSections/delete",projectSection);
  }

  update(projectSection:ProjectSection): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectSections/update",projectSection);
  }

  getByProjectID(ProjectID:number): Observable<ListResponseModel<ProjectSection>>{
    let newPath = this.apiUrl + "projectSections/getbyprojectid?projectID="+ProjectID;
    return this.httpClient.get<ListResponseModel<ProjectSection>>(newPath);
  }
}
