import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiUrl = "http://localhost:3000/users";
  createUrl = "http://localhost:3000/user";


  constructor(private http: HttpClient) { }
  // get all data
  getAllUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}`)
  }
  //create data
  createData(data: any): Observable<any> {
    console.log(data, 'crerate user')
    return this.http.post(`${this.createUrl}`, data)
  }

  //Delete Data
  deleteData(id: any): Observable<any> {
    let ids = id
    return this.http.delete(`${this.createUrl}/${ids}`);
  }

  //Update data
  updateData(data: any, id: any): Observable<any> {
    let ids = id
    return this.http.put(`${this.createUrl}/${ids}`, data);
  }
  //getSingleData
  getSingleData(id: any): Observable<any> {
    let ids = id
    return this.http.get(`${this.createUrl}/${ids}`);
  }
}
