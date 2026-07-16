import { Component, OnInit } from '@angular/core';

import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { getErrorMessage } from '../../shared/http-error.util';

@Component({
  selector: 'app-expense-list',
  standalone: false,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  errorMessage: string | null = null;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getAll().subscribe({
      next: expenses => {
        this.expenses = expenses;
        this.errorMessage = null;
      },
      error: err => {
        this.errorMessage = getErrorMessage(err);
      }
    });
  }

  deleteExpense(id: number | undefined): void {
    if (id === undefined) {
      return;
    }
    this.expenseService.delete(id).subscribe({
      next: () => {
        this.loadExpenses();
      },
      error: err => {
        this.errorMessage = getErrorMessage(err);
      }
    });
  }
}
