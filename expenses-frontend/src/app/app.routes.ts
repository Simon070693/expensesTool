import { Routes } from '@angular/router';
import { ExpenseFormComponent } from './components/expense-form/expense-form';

export const routes: Routes = [
  {
    path: '',
    component: ExpenseFormComponent
  },
  {
    path: 'expenses',
    component: ExpenseFormComponent
  }
];
