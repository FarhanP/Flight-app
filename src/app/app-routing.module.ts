import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ManagePassengerComponent } from './admin/manage-passenger/manage-passenger.component';
import { ManageFlightServicesComponent } from './admin/manage-flight-services/manage-flight-services.component';
import { StaffDashboardComponent } from './airline-staff/staff-dashboard/staff-dashboard.component';
import { CheckInComponent } from './airline-staff/check-in/check-in.component';
import { InFlightComponent } from './airline-staff/in-flight/in-flight.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent, pathMatch: 'full', data: { animation: 'isRight' } },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    data: { animation: 'isLeft' }

  },
  {
    path: 'admin/flightservices/:id',
    component: ManageFlightServicesComponent,
    canActivate: [AdminGuard],
    data: { animation: 'isRight' }
  },

  {
    path: 'admin/passengers/:id',
    component: ManagePassengerComponent,
    canActivate: [AdminGuard],
    data: { animation: 'isDown' }
  },

  {
    path: 'staff',
    component: StaffDashboardComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isLeft' }
  },

  {
    path: 'staff/check-In/:id',
    component: CheckInComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isRight' }
  },

  {
    path: 'staff/In-flight/:id',
    component: InFlightComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isRight' }
  },

  // should be placed last to avoid loading this component even if the route is valid
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animation: 'isRight' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  WelcomePageComponent,
  DashboardComponent,
  PageNotFoundComponent,
];
