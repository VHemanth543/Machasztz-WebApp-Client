import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {

  constructor(private http : HttpClient) { }

  setData(data : any) : Observable<any>{
    let headers = new HttpHeaders();
        headers.append('Content-Type' , 'application/json');
        return this.http.post("http://localhost:8000/add" , data , {headers : headers});
  }

  getData() : Observable<any>{
    let header = new HttpHeaders();
    header.append('Content-Type' , 'application/json')
    return this.http.get("http://localhost:8000/get", {headers : header})
  
  }

  deleteUser(data :any) : Observable<any>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json')
    return this.http.delete("http://localhost:8000/delete",{headers : header, body : data})
  }
}
