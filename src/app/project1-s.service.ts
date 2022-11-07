import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseClass } from './models/ResponseClass';

@Injectable({
  providedIn: 'root'
})
export class Project1SService {

  constructor(private httpClient: HttpClient) { }

 // apiUrl = "http://localhost:8081/projectone/project1";
  apiUrl = "http://localhost:8088/project1"; 

  public somme(data:any):Observable<number>{
    return this.httpClient.post<number>(`${this.apiUrl}/somme`,data);
  }

  public getpk_route(data:any):Observable<number>{
    return this.httpClient.post<number>(`${this.apiUrl}/getpk_route`,data);
  }

  public getsection_pkd_pkf_route(data:any):Observable<Array<ResponseClass>>{
    return this.httpClient.post<Array<ResponseClass>>(`${this.apiUrl}/getsection_pkd_pkf_route`,data);
  }

  public project_point(data:any):Observable<Array<ResponseClass>>{
    return this.httpClient.post<Array<ResponseClass>>(`${this.apiUrl}/project_point`,data);
  }

  public projectLineByCoordEvent(data:any):Observable<Array<ResponseClass>>{
    return this.httpClient.post<Array<ResponseClass>>(`${this.apiUrl}/projectLineByCoordEvent`,data);
  }
 
  public getRouteNames():Observable<Array<Object>>{
    return this.httpClient.get<Array<Object>>(`${this.apiUrl}/getRouteNames`);
  }
 

  public Localiser_un_point(data:any):Observable<string>{
    return this.httpClient.post<string>(`${this.apiUrl}/Localiser_un_point`,data);
  }


  public getSegments(data:any):Observable<Array<ResponseClass>>{
    return this.httpClient.post<Array<ResponseClass>>(`${this.apiUrl}/getSegments`,data);
  }
 


  
}
