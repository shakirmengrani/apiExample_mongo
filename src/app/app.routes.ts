import { provideRoutes, Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import {login} from './login.component';
import {OtherApp} from './other.component';
import {posts} from './posts.firebase.component';

export const appRoutes = [
  
  {
    path: 'login',
    component: login,
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: posts
  },
  {
  path: '',
  component: OtherApp
  }
  // ,
  // {
  //   path: '**',
  //   component: login
  // }
];

// export const routing = RouterModule.forRoot(appRoutes);
export const APP_ROUTER_PROVIDER = provideRoutes(appRoutes);