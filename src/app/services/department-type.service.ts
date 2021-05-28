import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentType } from '../models/departmentTypes/departmentType';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentTypeService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(departmentType:DepartmentType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"departmenttypes/add",departmentType);
  }

  update(departmentType:DepartmentType): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"departmenttypes/update",departmentType);
  }

  getAll(): Observable<ListResponseModel<DepartmentType>>{
    let newPath = this.apiUrl + "departmenttypes/getall";
    return this.httpClient.get<ListResponseModel<DepartmentType>>(newPath);
  }
}
