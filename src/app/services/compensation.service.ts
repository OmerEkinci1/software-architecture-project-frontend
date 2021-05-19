import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compensation } from '../models/compensations/compensation';
import { WorkerCompensationDto } from '../models/compensations/workerCompensationDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CompensationService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(compensation:Compensation): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"compensations/add",compensation);
  }

  update(compensation:Compensation): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"compensations/update",compensation);
  }

  getAll(): Observable<ListResponseModel<WorkerCompensationDto>>{
    let newPath = this.apiUrl + "compensations/getall=";
    return this.httpClient.get<ListResponseModel<WorkerCompensationDto>>(newPath);
  }

  getByUserID(UserID:number): Observable<ListResponseModel<WorkerCompensationDto>>{
    let newPath = this.apiUrl + "compensations/getbyuserid?userID="+UserID;
    return this.httpClient.get<ListResponseModel<WorkerCompensationDto>>(newPath);
  }

  getByWorkerID(WorkerID:number): Observable<ListResponseModel<WorkerCompensationDto>>{
    let newPath = this.apiUrl + "compensations/getbyworkerid?workerID="+WorkerID;
    return this.httpClient.get<ListResponseModel<WorkerCompensationDto>>(newPath);
  }
}
