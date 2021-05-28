import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Salary } from '../models/salaries/salary';
import { WorkerSalaryDto } from '../models/salaries/workerSalaryDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(salary:Salary): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"salaries/add",salary);
  }

  update(salary:Salary): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"salaries/update",salary);
  }

  getAll(): Observable<ListResponseModel<WorkerSalaryDto>>{
    let newPath = this.apiUrl + "salaries/getall";
    return this.httpClient.get<ListResponseModel<WorkerSalaryDto>>(newPath);
  }

  // list döndürdüm ama emin değilim
  getByUserID(UserID:number): Observable<ListResponseModel<WorkerSalaryDto>>{
    let newPath = this.apiUrl + "salaries/getbyuserid?userID="+UserID;
    return this.httpClient.get<ListResponseModel<WorkerSalaryDto>>(newPath);
  }

  getByWorkerID(WorkerID:number): Observable<ListResponseModel<WorkerSalaryDto>>{
    let newPath = this.apiUrl + "salaries/getbyworkerid?userID="+WorkerID;
    return this.httpClient.get<ListResponseModel<WorkerSalaryDto>>(newPath);
  }
}
