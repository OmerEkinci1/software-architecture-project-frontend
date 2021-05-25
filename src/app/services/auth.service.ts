import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login/loginModel';
import { RegisterModel } from '../models/register/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token/tokenModel';
import { UserDto } from '../models/users/userDto';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44380/api/";
  constructor(
    private httpClient:HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  login(loginModel:LoginModel) : Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",loginModel);
  }

  register(registerModel: RegisterModel) : Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/register",registerModel);
  }

  logout() {
    this.localStorageService.remove('tokenModel');
    this.localStorageService.remove('Email');
    //this.deleteUserDetail();
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  // setUserDetail(userDto: UserDto) {
  //   this.store.dispatch(this.setUserDetail({ userDto: userDto }));
  // }

  // deleteUserDetail() {
  //   this.store.dispatch(this.deleteUserDetail());
  // }
}
