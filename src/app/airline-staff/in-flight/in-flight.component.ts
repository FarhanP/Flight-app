import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PassengerState, AppState } from 'src/app/models/app.state';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import * as PassengerActions from '../../store/actions/passengers.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Passengers } from 'src/app/models/passengers.modals';
import { Validators, FormBuilder } from '@angular/forms';

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
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss'],
})
export class InFlightComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = ['name', 'ancillaryServices', 'shop', 'button'];

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
  filteredFlights: any;
  dataSource1 = ELEMENT_DATA;
  filterStatus = false;
  temp: any;
  passengers$: Observable<PassengerState>;
  flightpassenger: any;
  passengerData: any;
  users: any;
  updatedMeal: any;
  mealType: any;
  flights$: Observable<AppState>;

  versions = ['Checked-In', 'Not Checked-In', 'Wheel Chair', 'Infant'];

  nonVeg = false;
  showAncillaryData: any;
  updateId: any;
  @ViewChild('changeMealPreference', { static: true })
  changeMealPreference: TemplateRef<any>;
  @ViewChild('addAncillary', { static: true }) addAncillary: TemplateRef<any>;
  @ViewChild('addShoppingItems', { static: true })
  addShoppingItems: TemplateRef<any>;
  seatMapTempData: any;
  [x: string]: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    private formBuild: FormBuilder,
    public dialog: MatDialog
  ) {
    this.passengers$ = this.store.select('passengerState');
    this.flights$ = this.store.select('flightState');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });

    this.pass = this.formBuild.group({
      nonVeg: [this.nonVeg, Validators.required]

    });



    this.passengers$.subscribe((state: PassengerState) => {
      this.users = state.passengers;
      this.flightpassenger = this.users.filter(
        (user) => user.flightNumber === this.queryParamStatus
      );
      this.flights$.subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (state: AppState) => {
          this.flights = state.flights;
          this.filteredFlights = this.flights.filter((flight) => flight.flightNumber === this.queryParamStatus);
        }
      );
    });
    this.dataSource = new MatTableDataSource(this.flightpassenger);
  }

  openDialog(templateRef: TemplateRef<any>, val): void {
    this.updateId = val.id;
    this.passengerData = this.flightpassenger.filter((passenger) => passenger.id === val.id);

    this.showAncillaryData = this.passengerData[0].ancillaryServices;

    this.nonVeg = this.passengerData[0].specialMeals;

    const dialogRef = this.dialog.open(templateRef, {
      width: '300px',
      data: {
        id: val.id,
        specialMeals: this.passengerData[0].specialMeals
      }

    });

    dialogRef.afterClosed().subscribe(() => { });
  }

  addAncillaryServices(value): any {
    this.filteredPassenger = this.flightpassenger.filter(
      (user) => user.id === this.updateId
    );

    this.parsedPassengerData = JSON.parse(JSON.stringify(this.filteredPassenger));

    const ancillaryService = this.parsedPassengerData[0].ancillaryServices;

    ancillaryService.push(value);


    this.parsedPassengerData.forEach((a) => {
      if (a.id === this.updateId) {
        this.patchUpdate = new Passengers();
        (this.patchUpdate.id = this.filteredPassenger[0].id),
          (this.patchUpdate.ancillaryServices = ancillaryService);
      }
    });
    this.store.dispatch(new PassengerActions.UpdatePassenger(this.patchUpdate));
    this.dataSource = new MatTableDataSource(this.flightservices);
    this.dialog.closeAll();
  }

  addShopItem(value): void {
    this.filteredPassenger = this.flightpassenger.filter(
      (user) => user.id === this.updateId
    );

    this.parsedPassengerData = JSON.parse(JSON.stringify(this.filteredPassenger));


    const shopItems = this.parsedPassengerData[0].shoppingItems;

    shopItems.push(value);

    this.parsedPassengerData.forEach((a) => {
      if (a.id === this.updateId) {
        this.patchUpdate = new Passengers();
        (this.patchUpdate.id = this.filteredPassenger[0].id),
          (this.patchUpdate.shoppingItems = shopItems);
      }
    });
    this.store.dispatch(new PassengerActions.UpdatePassenger(this.patchUpdate));
    this.shoppingSource = new MatTableDataSource(this.shoppingServices);
    this.dialog.closeAll();
  }

  ngAfterViewChecked(): any {
    if (this.filterStatus) {
      this.dataSource = new MatTableDataSource(this.newPassengers);
    } else {
      this.dataSource = new MatTableDataSource(this.flightpassenger);
    }
  }


  handleClick(val, val2): void {
    const seatNum = val + val2;

    const element = this.flightpassenger.find((e) => e.seatNumber === seatNum);

    if (!element) {
      const users = JSON.parse(JSON.stringify(this.users));
      const data = users.find((d) => d.seatNumber === this.seatMapTempData);
      data.seatNumber = seatNum;
      this.store.dispatch(new PassengerActions.UpdatePassenger(data));
    }

    this.dialog.closeAll();
    setTimeout(() => location.reload(), 1000);
  }

  CheckedIn(val): void {
    const passengerId = val.id;
    const element = this.flightpassenger.find((a) => a.id === passengerId);
    if (element) {
      const nElement = JSON.parse(JSON.stringify(element));

      nElement.checkedIn = !nElement.checkedIn;

      this.store.dispatch(new PassengerActions.UpdatePassenger(nElement));
    }
    location.reload();
  }

  getClassname(val, val2): any {
    let className = '';
    const seatNum = `${val}${val2}`;
    const element = this.flightpassenger.find((a) => a.seatNumber === seatNum);
    if (element && element.id) {
      if (element.specialMeals) {
        className = className + ' special-meals';
      } else {
        className = className + 'available';
      }

      if (!val2) {
        return 'midline';
      }
      return className;
    }
    return 'available';
  }

  specialmealsPreferences(nonVeg): any {
    this.filteredPassengerData = this.flightpassenger.filter(
      (user) => user.id === this.updateId
    );
    this.parsedPassengerData = JSON.parse(JSON.stringify(this.filteredPassengerData));
    this.updatedMeal = new Passengers();
    this.parsedPassengerData.forEach((a) => {
      if (a.id === this.updateId) {
        Object.keys(a).map((aa) => {
          (this.updatedMeal.id = this.filteredPassengerData[0].id),
            (this.updatedMeal.specialMeals = this.pass.get('nonVeg').value);
        });
      }
    });


    this.store.dispatch(new PassengerActions.UpdatePassenger(this.updatedMeal));

    this.dialog.closeAll();
  }

  // tslint:disable-next-line: typedef
  setPreference(event) {
    this.nonVeg = event.checked;
  }
}
