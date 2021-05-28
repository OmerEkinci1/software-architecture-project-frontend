import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Project } from '../models/projects/project';
import { ProjectCreationDto } from '../models/projects/projectCreationDto';
import { ProjectDetailDto } from '../models/projects/projectDetailDto';
import { ProjectGeneralDto } from '../models/projects/projectGeneralDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectGeneralService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(projectCreationDto:ProjectCreationDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectgeneral/add",projectCreationDto);
  }

  delete(ProjectID:number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectgeneral/delete?projectID=",ProjectID);
  }

  update(project:Project): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectgeneral/update",project);
  }
  
  // ben burayı list döndürdüm ama hiç emin değilim.
  getProjectByProjectID(ProjectID:number): Observable<ListResponseModel<ProjectGeneralDto>>{
    let newPath = this.apiUrl + "projectgeneral/getprojectbyprojectid?projectID="+ProjectID;
    return this.httpClient.get<ListResponseModel<ProjectGeneralDto>>(newPath);
  }

  getAll(): Observable<ListResponseModel<ProjectDetailDto>>{
    let newPath = this.apiUrl + "projectgeneral/getall";
    return this.httpClient.get<ListResponseModel<ProjectDetailDto>>(newPath);
  }
}
