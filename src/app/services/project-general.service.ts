import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Project } from '../models/projects/project';
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

  add(project:Project): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectGeneral/add",project);
  }

  delete(project:Project): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectGeneral/delete",project);
  }
  
  // ben burayı list döndürdüm ama hiç emin değilim.
  getProjectByProjectID(ProjectID:number): Observable<ListResponseModel<ProjectGeneralDto>>{
    let newPath = this.apiUrl + "projectGeneral/getprojectbyprojectid?projectID="+ProjectID;
    return this.httpClient.get<ListResponseModel<ProjectGeneralDto>>(newPath);
  }
}
