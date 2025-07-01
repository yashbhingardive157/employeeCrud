import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://127.0.0.1:8000/api/employee/';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  add(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, emp, this.httpOptions);
  }

  update(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl,emp,this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.request('delete', this.baseUrl, {
      body: { id },
      headers: this.httpOptions.headers
    });
  }
}