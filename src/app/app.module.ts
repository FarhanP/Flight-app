
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import {
  StoreModule,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { FlightsEffects } from './store/effects/flights.effects';
import { PassengersEffects } from './store/effects/passengers.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { reducers } from './store/index';
import { SocialLoginComponent } from './social-login/social-login.component';
import {
  SocialAuthServiceConfig,
  SocialLoginModule,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthGuard } from './auth.guard';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ManagePassengerComponent } from './admin/manage-passenger/manage-passenger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './admin.guard';
import { ManageFlightServicesComponent } from './admin/manage-flight-services/manage-flight-services.component';
import { CheckInComponent } from './airline-staff/check-in/check-in.component';
import { InFlightComponent } from './airline-staff/in-flight/in-flight.component';
import { SeatMapComponent } from './airline-staff/seat-map/seat-map.component';
import { StaffDashboardComponent } from './airline-staff/staff-dashboard/staff-dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';


export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['flightState', 'passengerState'],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    PageNotFoundComponent,
    WelcomePageComponent,
    SocialLoginComponent,
    WelcomePageComponent,
    ManagePassengerComponent,
    ManageFlightServicesComponent,
    CheckInComponent,
    InFlightComponent,
    SeatMapComponent,
    StaffDashboardComponent,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([FlightsEffects, PassengersEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('372578809888-of4qav9qmgiif0eolbvclik4hkjlidr7.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,

    },
    AdminGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
