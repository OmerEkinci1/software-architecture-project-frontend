import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { WorkerSalaryExperience } from '../models/workerSalaryExperiences/workerSalaryExperience';
import { WorkerSalaryExperienceDto } from '../models/workerSalaryExperiences/workerSalaryExperienceDto';

@Injectable({
  providedIn: 'root'
})
export class WorkerSalaryExperienceService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(workerSalaryExperience:WorkerSalaryExperience): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workerSalaryExperiences/add",workerSalaryExperience);
  }

  update(workerSalaryExperience:WorkerSalaryExperience): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"workerSalaryExperiences/update",workerSalaryExperience);
  }

  getByDepartmentTypeID(DepartmentTypeID:number): Observable<ListResponseModel<WorkerSalaryExperienceDto>>{
    let newPath = this.apiUrl + "workerSalaryExperiences/getbydepartmenttypeid?departmentTypeID="+DepartmentTypeID;
    return this.httpClient.get<ListResponseModel<WorkerSalaryExperienceDto>>(newPath);
  }
}
