import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewChecked,
  TemplateRef,
} from '@angular/core';
import {
  AppState
} from 'src/app/models/app.state';
import {
  Observable
} from 'rxjs';
import {
  MatPaginatorModule
} from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  Store
} from '@ngrx/store';

import {
  MatDialog
} from '@angular/material/dialog';
import {
  Flights
} from 'src/app/models/flights.modals';
import * as FlightActions from '../../store/actions/flights.actions';
import {
  _MatTabGroupBase
} from '@angular/material/tabs';

@Component({
  selector: 'app-manage-flight-services',
  templateUrl: './manage-flight-services.component.html',
  styleUrls: ['./manage-flight-services.component.scss'],
})
export class ManageFlightServicesComponent implements OnInit, AfterViewChecked {
  displayedColumnsAncillary: string[] = ['Ancillary', 'Edit', 'Delete'];
  displayedColumnsMeals: string[] = ['Special Meals', 'Edit', 'Delete'];
  displayedColumnsShopping: string[] = ['Shopping Items', 'Edit', 'Delete'];

  flights$: Observable<AppState>;
  columnsToDisplayAncillary: string[] = this.displayedColumnsAncillary.slice();
  columnsToDisplayMeals: string[] = this.displayedColumnsMeals.slice();
  columnsToDisplayShopping: string[] = this.displayedColumnsShopping.slice();
  dataSource: any;
  aservices: [] = [];
  queryParamStatus: any;
  flightpassenger: any;
  deleteAncillaryService: any;
  ancilary: string;
  services: any;
  ancilllaryAdded: any;

  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, {
    static: true
  }) table: MatTable<any>;
  @ViewChild('addAncillary', {
    static: true
  }) addAncillary: TemplateRef<any>;
  @ViewChild('updateAncillary', {
    static: true
  }) updatencillary: TemplateRef<
    any>;
  @ViewChild('addSpecialMeals', {
    static: true
  }) addSpecialMeals: TemplateRef<
    any>;
  @ViewChild('addShoppingItems', {
    static: true
  })
  addShoppingItems: TemplateRef<any>;
  @ViewChild('updateMeals', {
    static: true
  }) updateMeals: TemplateRef<any>;
  @ViewChild('updateShopping', {
    static: true
  }) updateShopping: TemplateRef<
    any>;

  servicesFlights: any;
  currentMeals: string;
  currentAncillary: string;
  oldAncillary: string;
  oldMeal: string;
  flightservices: any;
  patchUpdate: Flights;
  updateAncillary: Flights;
  arrayAnc: string[];
  mealServices: any;
  mealSource: any;
  shoppingSource: any;
  updateMeal: Flights;
  deleteSpecialMeals: Flights;
  currentSpecial: string;
  arrayMeals: string[];
  deleteSpecialMeal: Flights;
  currentItem: any;
  oldItem: any;
  shoppingServices: any;
  arrayItems: any[];
  updateItem: Flights;
  deleteShoppingItem: Flights;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private router: Router,
    private store: Store<any>,
    public dialog: MatDialog
  ) {
    this.flights$ = this.store.select('flightState');
  }


  ngAfterViewChecked(): void {
    this.dataSource = new MatTableDataSource(this.flightpassenger[0].ancillaryServices);
    this.mealSource = new MatTableDataSource(this.flightpassenger[0].specialMeals);
    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);
    this.ref.detectChanges();
  }

  openDialog(): any {
    this.dialog.open(this.addAncillary, {
      width: '300px',
    });
  }

  openMealDialog(): any {
    this.dialog.open(this.addSpecialMeals, {
      width: '300px',
    });
  }

  openShoppingDialog(): any {
    this.dialog.open(this.addShoppingItems, {
      width: '300px',
    });
  }

  openUpdateMealialog(element: any): any {
    this.currentMeals = this.flightpassenger[0].specialMeals.filter(
      (services: any) => services === element
    );
    this.oldMeal = this.currentMeals;
    this.dialog.open(this.updateMeals, {
      width: '300px',
    });
  }


  openUpdateShoppingDialog(element): any {
    this.currentItem = this.flightpassenger[0].shoppingItems.filter(
      (services) => services === element
    );
    this.oldItem = this.currentItem;
    this.dialog.open(this.updateShopping, {
      width: '300px',
    });
  }

  openUpdateDialog(element: any): any {
    this.currentAncillary = this.flightpassenger[0].ancillaryServices.filter(
      (services: any) => services === element
    );
    this.oldAncillary = this.currentAncillary;
    this.dialog.open(this.updatencillary, {
      width: '300px',
    });
  }

  ngOnInit(): any {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });

    this.flights$.subscribe((state: AppState) => {
      this.services = state.flights;
      this.flightpassenger = state.flights.filter(
        (services) => services.flightNumber === this.queryParamStatus
      );
    });


    this.dataSource = new MatTableDataSource(this.flightpassenger[0].ancillaryServices);
    this.mealSource = new MatTableDataSource(this.flightpassenger[0].specialMeals);
    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);
  }

  addAncillaryServices(value: any): any {
    const servicesStringify = JSON.parse(
      JSON.stringify(this.flightpassenger[0])
    );
    const ancillary = servicesStringify.ancillaryServices;
    ancillary.push(value);

    this.patchUpdate = new Flights();
    (this.patchUpdate.id = this.flightpassenger[0].id),
      (this.patchUpdate.ancillaryServices = ancillary);

    this.store.dispatch(new FlightActions.UpdateAncillary(this.patchUpdate));
    this.dialog.closeAll();
  }

  addSpeciaMeals(value: any): any {
    const mealsStringify = JSON.parse(JSON.stringify(this.flightpassenger[0]));
    const meals = mealsStringify.specialMeals;
    meals.push(value);
    this.patchUpdate = new Flights();
    (this.patchUpdate.id = this.flightpassenger[0].id),
      (this.patchUpdate.specialMeals = meals);
    this.store.dispatch(new FlightActions.UpdateSpecialMeals(this.patchUpdate));
    this.mealSource = new MatTableDataSource(this.flightpassenger[0].specialMeals);
    this.dialog.closeAll();
  }

  addShopItem(value: any): any {
    const itemsStringify = JSON.parse(JSON.stringify(this.flightpassenger[0]));
    const shopItems = itemsStringify.shoppingItems;
    shopItems.push(value);
    this.patchUpdate = new Flights();
    (this.patchUpdate.id = this.flightpassenger[0].id),
      (this.patchUpdate.shoppingItems = shopItems);
    this.store.dispatch(
      new FlightActions.UpdateShoppingItems(this.patchUpdate)
    );

    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);
    this.dialog.closeAll();
  }


  updateShoppingItems(): any {
    const itemStringify = JSON.parse(JSON.stringify(this.flightpassenger[0]));
    const shopItems = itemStringify.shoppingItems;
    const oldItems = this.flightpassenger[0].shoppingItems.filter(
      (service: any) => service === service
    );

    const index = this.flightpassenger[0].shoppingItems.indexOf(
      this.oldItem[0]
    );
    this.arrayItems = [...this.flightpassenger[0].shoppingItems];

    if (index !== -1) {
      this.arrayItems[index] = this.currentItem;
    }

    this.updateItem = new Flights();
    this.updateItem.id = this.flightpassenger[0].id;
    this.updateItem.shoppingItems = this.arrayItems;
    this.store.dispatch(new FlightActions.UpdateShoppingItems(this.updateItem));
    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);
    this.dialog.closeAll();
  }

  updateSpecialMeals(): void {
    const mealsStringify = JSON.parse(JSON.stringify(this.flightpassenger[0]));
    const meals = mealsStringify.specialMeals;
    const oldMeals = this.flightpassenger[0].specialMeals.filter(
      (service) => service === service
    );
    const index = this.flightpassenger[0].specialMeals.indexOf(
      this.oldMeal[0]
    );

    this.arrayMeals = [...this.flightpassenger[0].specialMeals];

    if (index !== -1) {
      this.arrayMeals[index] = this.currentMeals;
    }

    this.updateMeal = new Flights();
    this.updateMeal.id = this.flightpassenger[0].id;
    this.updateMeal.specialMeals = this.arrayMeals;
    this.store.dispatch(new FlightActions.UpdateSpecialMeals(this.updateMeal));
    this.mealSource = new MatTableDataSource(this.flightpassenger[0].specialMeals);
    this.dialog.closeAll();
  }

  updateAncillaryServices(): any {
    const index = this.flightpassenger[0].ancillaryServices.indexOf(
      this.oldAncillary[0]
    );

    this.arrayAnc = [...this.flightpassenger[0].ancillaryServices];

    if (index !== -1) {
      this.arrayAnc[index] = this.currentAncillary;
    }

    this.updateAncillary = new Flights();
    this.updateAncillary.id = this.flightpassenger[0].id;
    this.updateAncillary.ancillaryServices = this.arrayAnc;
    this.store.dispatch(
      new FlightActions.UpdateAncillary(this.updateAncillary)
    );
    this.dataSource = new MatTableDataSource(this.flightpassenger[0].ancillaryServices);
    this.dialog.closeAll();
  }


  deleteAncillary(element: any): any {
    const deleteElement = element;
    const index = this.flightpassenger[0].ancillaryServices.indexOf(deleteElement);
    this.arrayAnc = [...this.flightpassenger[0].ancillaryServices];
    if (index !== -1) {
      this.arrayAnc.splice(index, 1);
    }
    this.deleteAncillaryService = new Flights();
    this.deleteAncillaryService.id = this.flightpassenger[0].id;
    this.deleteAncillaryService.ancillaryServices = this.arrayAnc;
    this.store.dispatch(
      new FlightActions.UpdateAncillary(this.deleteAncillaryService)
    );
    this.dataSource = new MatTableDataSource(this.flightpassenger[0].ancillaryServices);
  }

  deleteMeals(element: any): void {
    const deleteMeal = element;
    const index = this.flightpassenger[0].specialMeals.indexOf(deleteMeal);
    this.arrayAnc = [...this.flightpassenger[0].specialMeals];
    if (index !== -1) {
      this.arrayAnc.splice(index, 1);
    }
    this.deleteSpecialMeal = new Flights();
    this.deleteSpecialMeal.id = this.flightpassenger[0].id;
    this.deleteSpecialMeal.specialMeals = this.arrayAnc;
    this.store.dispatch(
      new FlightActions.UpdateSpecialMeals(this.deleteSpecialMeal)
    );
    this.mealSource = new MatTableDataSource(this.flightpassenger[0].specialMeals);
  }

  deleteItem(element: any): void {
    const deleteItem = element;

    const index = this.flightpassenger[0].shoppingItems.indexOf(deleteItem);
    this.arrayItems = [...this.flightpassenger[0].shoppingItems];
    if (index !== -1) {
      this.arrayItems.splice(index, 1);
    }
    this.deleteShoppingItem = new Flights();
    this.deleteShoppingItem.id = this.flightpassenger[0].id;
    this.deleteShoppingItem.shoppingItems = this.arrayItems;
    this.store.dispatch(
      new FlightActions.UpdateShoppingItems(this.deleteShoppingItem)
    );
    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);
  }
}

