import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeWebApiUrl = 'https://localhost:5001/api/employee';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient,
      private messageService: MessageService) 
    { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeWebApiUrl + '/employees')
          .pipe(
            tap(_ => this.log(`fetched employees`)),
            catchError(this.handleError<Employee[]>('getEmployees',[]))
            );
  }
  getEmployee(id:number):Observable<Employee>{

    return this.http.get<Employee>(this.employeeWebApiUrl + `/employee/${id}`)
    .pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );

  }

  updateEmployee (employee: Employee): Observable<any> {
  return this.http.post(this.employeeWebApiUrl + '/employee/update', employee, this.httpOptions).pipe(
    tap(_ => this.log(`updated employee id=${employee.employeeId}`)),
    catchError(this.handleError<any>('updateEmployee'))
    );
  }

  addNewEmployee (employee: Employee): Observable<any> {
    return this.http.post(this.employeeWebApiUrl + '/add', employee, this.httpOptions).pipe(
      tap(_ => this.log(`added new employee id=${employee.employeeId}`)),
      catchError(this.handleError<any>('addNewEmployee'))
    );
   }


   removeEmployee (employee: Employee): Observable<any> {
    return this.http.post(this.employeeWebApiUrl + '/employee/remove', employee, this.httpOptions).pipe(
      tap(_ => this.log(`removed employee id=${employee.employeeId}`)),
      catchError(this.handleError<any>('removeEmployee'))
      );
    }

 private log(message:string){
    this.messageService.add(`EmployeeService:${message}`);
 }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // can send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
