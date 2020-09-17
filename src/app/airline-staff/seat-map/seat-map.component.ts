import { Component, OnInit } from '@angular/core';
import { AppState, PassengerState } from '../../models/app.state';
import { Observable } from 'rxjs';
import { Flights } from '../../models/flights.modals';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

const ELEMENT_DATA = [
  {
    0: 'F',
    1: 'x',
    2: 'x',
    3: 'x',
    4: 'x',
    5: 'x',
    6: 'x',
    7: 'x',
    8: 'x',
    9: 'x',
    10: 'x',
  },
  {
    0: 'E',
    1: 'x',
    2: 'x',
    3: 'x',
    4: 'x',
    5: 'x',
    6: 'x',
    7: 'x',
    8: 'x',
    9: 'x',
    10: 'x',
  },
  {
    0: 'D',
    1: 'x',
    2: 'x',
    3: 'x',
    4: 'x',
    5: 'x',
    6: 'x',
    7: 'x',
    8: 'x',
    9: 'x',
    10: 'x',
  },

  {
    0: 'C',
    1: 'x',
    2: 'x',
    3: 'x',
    4: 'x',
    5: 'x',
    6: 'x',
    7: 'x',
    8: 'x',
    9: 'x',
    10: 'x',
  },
  {
    0: 'B',
    1: 'x',
    2: 'x',
    3: 'x',
    4: 'x',
    5: 'x',
    6: 'x',
    7: 'x',
    8: 'x',
    9: 'x',
    10: 'x',
  },
  {
    0: 'A',
    1: 'x',
    2: 'x',
    3: 'x',
    4: 'x',
    5: 'x',
    6: 'x',
    7: 'x',
    8: 'x',
    9: 'x',
    10: 'x',
  },
];
@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})
export class SeatMapComponent implements OnInit {
  queryParamStatus;
  temp: any;
  passengerList: any;
  passengers$: Observable<any>;
  displayedColumns: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ];
  dataSource = ELEMENT_DATA;

  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.passengers$ = this.store.select('passengerState');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });
    this.passengers$.subscribe(
      (state: PassengerState) => (this.temp = state.passengers)
    );

    this.passengerList = this.temp.filter(
      (a) => a.flightNumber === this.queryParamStatus
    );
  }


  getClassname(val, val2): any {
    let className = '';
    const seatNum = `${val}${val2}`;

    const element = this.passengerList.find((a) => a.seatNumber === seatNum);

    if (element && element.id) {
      if (element.checkedIn) {
        className = className + ' checked-in';
      } else {
        className = className + ' booked';
      }
      if (element.wheelChair) {
        className = className + ' wheel-chair';
      }
      if (element.infant) {
        className = className + ' infant';
      }
      return className;
    }
    if (!val2) { return 'midline'; }
    return 'available';
  }
}
