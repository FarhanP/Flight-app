import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  TemplateRef,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PassengerState } from '../../models/app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  MatDialog,

} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import * as PassengerActions from '../../store/actions/passengers.actions';

import { MatPaginatorModule } from '@angular/material/paginator';
import { Passengers } from 'src/app/models/passengers.modals';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-manage-passenger',
  templateUrl: './manage-passenger.component.html',
  styleUrls: ['./manage-passenger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePassengerComponent
  implements OnInit, AfterViewChecked {
  pass: FormGroup;
  updatePassengerForm: FormGroup;
  Object = Object;
  queryParamStatus: any;
  passengerUpdated: Passengers;
  passengers$: Observable<PassengerState>;
  users: Passengers[];
  flightpassenger: any;
  filterStatus = false;
  display = false;
  versions = ['Passport', 'Address', 'dateOfBirth', 'Clear All'];
  displayedColumns: string[] = [
    'name',
    'ancillaryServices',
    'seatNumber',
    'button',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;

  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate: TemplateRef<
    any
  >;

  name: string;
  openStatus = false;
  data: [] = [];
  tempfinal: any;
  updateId: any;
  temp: any;
  passport: any;
  contactNumber: any;
  address: any;
  wheelchair = false;
  infant = false;
  updatePass: any;
  dateOfBirth: any;
  prevName: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    private formBuild: FormBuilder,
    public dialog: MatDialog
  ) {
    this.passengers$ = this.store.select('passengerState');
  }

  ngAfterViewChecked(): any {

    if (this.filterStatus) {
      this.dataSource = new MatTableDataSource(this.data);
    } else {
      this.dataSource = new MatTableDataSource(this.flightpassenger);
    }

    this.detectChanges();
  }

  // Opening the dialog
  openDialog(): any {
    const dialogRef = this.dialog.open(this.dialogTemplate, {

      width: '300px',
    });
    (this.name = ''), (this.address = ''), (this.passport = '');

    dialogRef.afterClosed().subscribe(() => { });
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });

    this.pass = this.formBuild.group({
      name: ['', Validators.required],
      passport: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      wheelchair: [this.wheelchair, Validators.required],
      infant: [this.infant, Validators.required]

    });

    this.updatePassengerForm = this.formBuild.group({
      name: ['', Validators.required],
      passport: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      wheelchair: [this.wheelchair, Validators.required],
      infant: [this.infant, Validators.required]

    });


    this.passengers$.subscribe((state: PassengerState) => {
      this.users = state.passengers;
      this.flightpassenger = this.users.filter(
        (user) => user.flightNumber === this.queryParamStatus
      );

    });


    this.flightpassenger = this.users.filter(
      (user) => user.flightNumber === this.queryParamStatus
    );

    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // tslint:disable-next-line: typedef
  setPreference(event) {
    this.wheelchair = event.checked;

  }

  // tslint:disable-next-line: typedef
  setInfantPreference(event) {
    this.infant = event.checked;

  }

  applyFilter(filterValue: string): any {
    switch (filterValue) {
      case 'dateOfBirth': {
        this.filtervalue('dateOfBirth');
        break;
      }
      case 'Passport': {
        this.filtervalue('passport');
        break;
      }
      case 'Address': {
        this.filtervalue('address');
        break;
      }
      default: {
        this.resetFilters();
        break;
      }
    }
  }

  // filter function

  filtervalue(val: string): any {
    this.data = this.flightpassenger.filter((column: { [data: string]: string; }) => {
      return column[val] === '' || undefined;
    });
    this.dataSource = new MatTableDataSource(this.data);
    this.filterStatus = true;
    return true;
  }


  // Reset table filters
  resetFilters(): any {
    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.filterStatus = false;
    return true;
  }

  // Adding passenger for the selected flight

  addPassenger = (data: any) => {
    const newPassenger: Passengers = {
      name: this.pass.get('name').value,
      passport:
        this.pass.get('passport').value == null
          ? ''
          : this.pass.get('passport').value,
      address:
        this.pass.get('address').value == null
          ? ''
          : this.pass.get('address').value,
      seatType: '',
      seatNumber: '',
      flightNumber: this.queryParamStatus,
      contactNumber: this.pass.get('contact').value == null ? '' : this.pass.get('contact').value,
      dateOfBirth:
        this.pass.get('dateOfBirth').value == null
          ? ''
          : this.pass.get('dateOfBirth').value,
      ancillaryServices: [],
      specialMeals: false,
      shoppingItems: [],
      checkedIn: false,
      infant: this.pass.get('infant').value === null ? false : this.infant,
      wheelChair: this.pass.get('wheelchair').value === null ? false : this.wheelchair,
      id: null,
    };

    this.store.dispatch(new PassengerActions.CreatePassenger(newPassenger));
    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.pass.reset();
    this.dialog.closeAll();
    this.resetFilters();
  }

  // Detecting changes made to the view

  detectChanges(): void {
    this.ref.detectChanges();
  }

  openUpdateDialog(templateRef: TemplateRef<any>, val: { id: number; }): any {
    this.updatePass = this.users.filter((user) => user.id === val.id);
    this.updateId = val.id;
    this.name = this.updatePass[0].name;
    this.passport = this.updatePass[0].passport;
    this.address = this.updatePass[0].address;
    this.contactNumber = this.updatePass[0].contactNumber;
    this.dateOfBirth = this.updatePass[0].dateOfBirth;
    this.infant = this.updatePass[0].infant;
    this.wheelchair = this.updatePass[0].wheelChair;

    this.dialog.open(templateRef, {
      data: {
        id: val.id,
        actualdata: this.users,
        name: this.updatePass[0].name,
        passport: this.updatePass[0].passport,
        address: this.updatePass[0].address,
        contactNumber: this.updatePass[0].contactNumber,
        dateOfBirth: this.updatePass[0].dateOfBirth,
        infant: this.updatePass[0].infant,
        wheelChair: this.updatePass[0].wheelChair

      },

      width: '300px',
    });
  }



  updatePassenger(vl: any): void {
    this.tempfinal = this.flightpassenger.filter(
      (user: { id: any; }) => user.id === this.updateId
    );
    this.temp = JSON.parse(JSON.stringify(this.tempfinal));
    this.passengerUpdated = new Passengers();
    this.temp.forEach((a: { id?: any; }) => {
      if (a.id === this.updateId) {
        Object.keys(a).map((aa) => {
          (this.passengerUpdated.id = this.tempfinal[0].id),
            (this.passengerUpdated.name = this.updatePassengerForm.get('name').value),
            (this.passengerUpdated.passport = this.updatePassengerForm.get('passport').value),
            (this.passengerUpdated.address = this.updatePassengerForm.get('address').value),
            (this.passengerUpdated.contactNumber = this.updatePassengerForm.get('contact').value),
            (this.passengerUpdated.dateOfBirth = this.updatePassengerForm.get('dateOfBirth').value == null ? '' : this.dateOfBirth),
            (this.passengerUpdated.wheelChair = this.updatePassengerForm.get('wheelchair').value),
            (this.passengerUpdated.infant = this.updatePassengerForm.get('infant').value);
        });
      }
    });

    this.store.dispatch(
      new PassengerActions.UpdatePassenger(this.passengerUpdated)
    );
    this.pass.reset();
    this.dialog.closeAll();
    this.resetFilters();
    this.dataSource = new MatTableDataSource(this.flightpassenger);
  }
}

