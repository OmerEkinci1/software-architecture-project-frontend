import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim/operationClaim';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(operationClaim:OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/add",operationClaim);
  }

  delete(operationClaim:OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/delete",operationClaim);
  }

  update(operationClaim:OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"operationClaims/update",operationClaim);
  }

  getAll(): Observable<ListResponseModel<OperationClaim>>{
    let newPath = this.apiUrl + "operationClaims/getall=";
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
}
