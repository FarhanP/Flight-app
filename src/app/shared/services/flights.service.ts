import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Flights } from '../../models/flights.modals';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private baseUrl = 'http://localhost:3001/flights/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getFlights(): Observable<Flights[]> {
    return this.http.get<Flights[]>(this.baseUrl).pipe(
      tap((flights) => {
        return flights;
      }),
      catchError(this.handleError('getFlights', []))
    );
  }

  addAncillaryServices(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      catchError(this.handleError('addAncillaryServices', flight))
    );
  }

  UpdateAncillary(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable

      catchError(this.handleError('UpdateAncillary', flight))
    );
  }

  DeleteAncillary(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable

      catchError(this.handleError('DeleteAncillary', flight))
    );
  }

  CreateSpecialMeals(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      catchError(this.handleError('CreateSpecialMeals', flight))
    );
  }

  UpdateSpecialMeals(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable

      catchError(this.handleError('UpdateSpecialMeals', flight))
    );
  }

  DeleteSpecialMeals(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      catchError(this.handleError('DeleteSpecialMeals', flight))
    );
  }
  CreateShoppingItems(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
      }),
      catchError(this.handleError('CreateShoppingItems', flight))
    );
  }
  UpdateShoppingItems(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
      }),
      catchError(this.handleError('UpdateShoppingItems', flight))
    );
  }

  DeleteShoppingItems(flight: Flights): Observable<Flights> {
    const id = flight.id;
    return this.http.patch<Flights>(this.baseUrl + id, flight).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((flight) => {
      }),
      catchError(this.handleError('DeleteShoppingItems', flight))
    );
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

