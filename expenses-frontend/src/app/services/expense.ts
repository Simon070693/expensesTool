import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Expense {
  id?: string;
  description: string;
  amount: number;
  date: string;
  categoryName?: string;
}

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  date: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = '/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  createExpense(request: CreateExpenseRequest): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, request);
  }
}
