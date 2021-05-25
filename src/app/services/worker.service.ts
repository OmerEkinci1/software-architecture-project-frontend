import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Worker } from '../models/workers/worker';
import { WorkerDto } from '../models/workers/workerDto';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(worker:Worker): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workers/add",worker);
  }

  delete(worker:Worker): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workers/delete",worker);
  }

  update(worker:Worker): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workers/update",worker);
  }

  getAll(): Observable<ListResponseModel<WorkerDto>>{
    let newPath = this.apiUrl + "workers/getall";
    return this.httpClient.get<ListResponseModel<WorkerDto>>(newPath);
  }
}
