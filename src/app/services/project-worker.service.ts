import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectWorker } from '../models/projectWorkers/projectWorker';
import { ProjectWorkerGeneralDto } from '../models/projectWorkers/projectWorkerGeneralDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectWorkerService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(projectWorker:ProjectWorker): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectWorkers/add",projectWorker);
  }

  delete(projectWorkerID:number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "projectWorkers/delete?projectWorkerID="+projectWorkerID,null);
  }

  update(projectWorker:ProjectWorker): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectWorkers/update",projectWorker);
  }

  getAll(): Observable<ListResponseModel<ProjectWorkerGeneralDto>>{
    let newPath = this.apiUrl + "projectWorkers/getall";
    return this.httpClient.get<ListResponseModel<ProjectWorkerGeneralDto>>(newPath);
  }
}
