import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectWorkerWorkingTime } from '../models/projectWorkerWorkingTimes/projectWorkerWorkingTime';
import { ProjectWorkerWorkingTimeDto } from '../models/projectWorkerWorkingTimes/projectWorkerWorkingTimeDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectWorkerWorkingTimeService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(projectWorkerWorkingTime:ProjectWorkerWorkingTime): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectWorkerWokingTimes/add",projectWorkerWorkingTime);
  }

  update(projectWorkerWorkingTime:ProjectWorkerWorkingTime): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"projectWorkerWokingTimes/update",projectWorkerWorkingTime);
  }

  getAll(): Observable<ListResponseModel<ProjectWorkerWorkingTimeDto>>{
    let newPath = this.apiUrl + "projectWorkerWokingTimes/getall=";
    return this.httpClient.get<ListResponseModel<ProjectWorkerWorkingTimeDto>>(newPath);
  }

  getByProjectWorkerID(projectWorkerID:number): Observable<ListResponseModel<ProjectWorkerWorkingTimeDto>>{
    let newPath = this.apiUrl + "projectWorkerWokingTimes/getbyprojectworkerid?projectWorkerID="+projectWorkerID;
    return this.httpClient.get<ListResponseModel<ProjectWorkerWorkingTimeDto>>(newPath);
  }
}
