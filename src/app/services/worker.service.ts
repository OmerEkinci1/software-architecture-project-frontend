import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { WorkerModel } from '../models/workers/workerModel';
import { WorkerDto } from '../models/workers/workerDto';
import { WorkerCreationDto } from '../models/workers/workerCreationDto';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(worker:WorkerCreationDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workers/add",worker);
  }

  delete(worker:WorkerModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workers/delete",worker);
  }

  update(worker:WorkerModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workers/update",worker);
  }

  getAll(): Observable<ListResponseModel<WorkerDto>>{
    let newPath = this.apiUrl + "workers/getall";
    return this.httpClient.get<ListResponseModel<WorkerDto>>(newPath);
  }

  getallworkerstatusfalse(): Observable<ListResponseModel<WorkerModel>>{
    let newPath = this.apiUrl + "workers/getallworkerstatusfalse";
    return this.httpClient.get<ListResponseModel<WorkerModel>>(newPath);
  }
}
