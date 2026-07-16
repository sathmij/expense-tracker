import { Component, OnInit } from '@angular/core';

import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: false,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getAll().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  deleteExpense(id: number | undefined): void {
    if (id === undefined) {
      return;
    }
    this.expenseService.delete(id).subscribe(() => {
      this.loadExpenses();
    });
  }
}
