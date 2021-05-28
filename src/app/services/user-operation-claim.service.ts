import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserOperationClaim } from '../models/userOperationClaims/userOperationClaim';
import { UserOperationClaimDto } from '../models/userOperationClaims/userOperationClaimDto';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  add(userOperationClaim:UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"userOperationClaims/add",userOperationClaim);
  }

  delete(userOperationClaim:UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"userOperationClaims/delete",userOperationClaim);
  }

  update(userOperationClaim:UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"userOperationClaims/update",userOperationClaim);
  }

  getAll(): Observable<ListResponseModel<UserOperationClaimDto>>{
    let newPath = this.apiUrl + "useroperationclaims/getall";
    return this.httpClient.get<ListResponseModel<UserOperationClaimDto>>(newPath);
  }
}
