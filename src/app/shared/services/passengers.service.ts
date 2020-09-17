import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Passengers } from '../../models/passengers.modals';

@Injectable({ providedIn: 'root' })
export class PassengerService {
  private baseUrl = 'http://localhost:3001/passengers/';
  list$: BehaviorSubject<Passengers[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getPassengers(): Observable<Passengers[]> {
    return this.http.get<Passengers[]>(this.baseUrl).pipe(
      tap((passengers) => {
        return passengers;
      }),
      catchError(this.handleError('getPassengers', []))
    );
  }

  addPassengers(passenger: Passengers): Observable<Passengers> {
    return this.http.post<Passengers>(this.baseUrl, passenger).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((passenger) => {
      }),
      catchError(this.handleError('addPassengers', passenger))
    );
  }

  updatePassengers(passenger: Passengers): Observable<Passengers> {
    const id = passenger.id;
    return this.http.patch<Passengers>(this.baseUrl + id, passenger).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((passenger) => {
      }),
      catchError(this.handleError('updatePassengers', passenger))
    );
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
