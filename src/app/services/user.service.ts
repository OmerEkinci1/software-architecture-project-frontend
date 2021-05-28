import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44380/api/";
  constructor(private httpClient:HttpClient) { }

  delete(user:User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"users/delete",user);
  }

  update(user:User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"users/update",user);
  }

  get(UserID:number): Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/get?userID="+UserID;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getalluserbystatustrue(): Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl + "users/getalluserbystatustrue";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
}
