import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PartyComponent } from './party/party.component';
import { DetailsComponent } from './party/details/details.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'party-details',
    component: PartyComponent,
  },
  {
    path: 'party-details/party',
    component: DetailsComponent,
  },
  {
    path: 'party-details/party/:id',
    component: DetailsComponent,
  },
];
