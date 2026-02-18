import { Routes } from '@angular/router';
import { UserList } from './features/user-list/user-list.component';
import { UserEdit } from './features/user-edit/user-edit.component';
import { UserDetail } from './features/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: UserList,
  },
  {
    path: 'list',
    component: UserList,
  },
  {
    path: 'add',
    component: UserEdit,
  },
  {
    path: 'edit/:id',
    component: UserEdit,
  },
  {
    path: 'detail/:id',
    component: UserDetail,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
