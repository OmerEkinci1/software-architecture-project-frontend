import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { WorkerDepartmentDto } from '../models/workerDepartmentTypes/workerDepartmentDto';
import { WorkerDepartmentType } from '../models/workerDepartmentTypes/workerDepartmentType';

@Injectable({
  providedIn: 'root'
})
export class WorkerDepartmentTypeService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(workerDepartmentType:WorkerDepartmentType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workerDepartmentTypes/add",workerDepartmentType);
  }

  delete(workerDepartmentType:WorkerDepartmentType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workerDepartmentTypes/delete",workerDepartmentType);
  }
// burada departmana ait workerlar dönücek bize.
  getAllDepartmentByID(departmentTypeID:number): Observable<ListResponseModel<WorkerDepartmentDto>>{
    let newPath = this.apiUrl + "workerDepartmentTypes/getallbydepartmenttypeid?departmentTypeID="+departmentTypeID;
    return this.httpClient.get<ListResponseModel<WorkerDepartmentDto>>(newPath);
  }

  getAll(): Observable<ListResponseModel<WorkerDepartmentDto>>{
    let newPath = this.apiUrl + "workerDepartmentTypes/getall";
    return this.httpClient.get<ListResponseModel<WorkerDepartmentDto>>(newPath);
  }
}
