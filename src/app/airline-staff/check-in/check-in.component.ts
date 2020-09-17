import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
  AfterViewChecked,
} from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PassengerState } from 'src/app/models/app.state';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import * as PassengerActions from '../../store/actions/passengers.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = [
    'name',
    'ancillaryServices',
    'seatNumber',
    'CheckedIn',
    'button',
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  displayedColumns1: string[] = [
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
  dataSource: any;
  queryParamStatus: any;
  dataSource1 = ELEMENT_DATA;
  filterStatus = false;
  temp: any;
  passengers$: Observable<PassengerState>;
  flightpassenger: any;
  users: any;

  versions = ['Checked-In', 'Not Checked-In', 'Wheel Chair', 'Infant'];

  @ViewChild('dialogTemplate', { static: true }) dialogTemplate: TemplateRef<
    any
  >;
  seatMapTempData: any;
  [x: string]: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.passengers$ = this.store.select('passengerState');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });
    this.passengers$.subscribe((state: PassengerState) => {
      this.users = state.passengers;
      this.flightpassenger = this.users.filter(
        (user: { flightNumber: any; }) => user.flightNumber === this.queryParamStatus
      );
    });
    this.dataSource = new MatTableDataSource(this.flightpassenger);
  }

  openDialog(val: { seatNumber: any; }): any {
    this.seatMapTempData = val.seatNumber;
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '600px',

    });
  }

  ngAfterViewChecked(): any {
    if (this.filterStatus) {
      this.dataSource = new MatTableDataSource(this.newPassengers);
    } else {
      this.dataSource = new MatTableDataSource(this.flightpassenger);
    }
  }

  applyFilter(filterValue: string): any {
    this.filterStatus = true;
    switch (filterValue) {
      case 'Checked-In': {
        this.newPassengers = this.flightpassenger.filter(
          (a: { checkedIn: boolean; }) => a.checkedIn === true
        );
        break;
      }
      case 'Not Checked-In': {
        this.newPassengers = this.flightpassenger.filter(
          (a: { checkedIn: boolean; }) => a.checkedIn === false
        );
        break;
      }
      case 'Wheel Chair': {
        this.newPassengers = this.flightpassenger.filter(
          (a: { wheelChair: boolean; }) => a.wheelChair === true
        );
        break;
      }
      case 'Infant': {
        this.newPassengers = this.flightpassenger.filter(
          (a: { infant: boolean; }) => a.infant === true
        );
        break;
      }
      default: {
        this.resetFilters();
        this.newPassengers = this.flightpassenger;
      }
    }
    this.dataSource = new MatTableDataSource(this.newPassengers);
  }

  resetFilters(): boolean {
    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.filterStatus = false;
    return true;
  }

  handleClick(val: any, val2: any): any {
    const seatNum = val + val2;
    const element = this.flightpassenger.find((a: { seatNumber: any; }) => a.seatNumber === seatNum);
    if (!element) {
      const ntemp = JSON.parse(JSON.stringify(this.users));
      const data = ntemp.find((a: { seatNumber: any; }) => a.seatNumber === this.seatMapTempData);
      data.seatNumber = seatNum;
      this.store.dispatch(new PassengerActions.UpdatePassenger(data));
    }
    this.dialog.closeAll();
    this.router.navigate(['staff']);

  }

  CheckedIn(val: { id: any; }): any {
    const passengerId = val.id;
    // tslint:disable-next-line: no-shadowed-variable
    const element = this.flightpassenger.find((element: { id: any; }) => element.id === passengerId);
    if (element) {
      const nElement = JSON.parse(JSON.stringify(element));
      nElement.checkedIn = !nElement.checkedIn;

      this.store.dispatch(new PassengerActions.UpdatePassenger(nElement));
    }

  }

  getClassname(val: any, val2: any): any {
    let className = '';
    const seatNum = `${val}${val2}`;
    const element = this.flightpassenger.find((a: { seatNumber: string; }) => a.seatNumber === seatNum);
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
