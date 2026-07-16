import { Component, OnInit } from '@angular/core';

import { ExpenseSummary } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-summary',
  standalone: false,
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css'
})
export class ExpenseSummaryComponent implements OnInit {
  summary?: ExpenseSummary;
  categoryEntries: [string, number][] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getSummary().subscribe(summary => {
      this.summary = summary;
      this.categoryEntries = Object.entries(summary.byCategory) as [string, number][];
    });
  }
}
