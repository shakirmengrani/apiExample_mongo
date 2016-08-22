import { RouterConfig, provideRoutes, Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import {App} from './app.component';
import {login} from './login.component';
import {OtherApp} from './other.component';

export const appRoutes: RouterConfig = [
  {
  path: '',
  component: login
  },
  {
    path: 'login',
    component: login,
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: OtherApp
  }
];

// export const routing = RouterModule.forRoot(appRoutes);
export const APP_ROUTER_PROVIDER = provideRoutes(appRoutes);