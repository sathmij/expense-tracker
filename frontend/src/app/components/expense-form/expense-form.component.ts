import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { getErrorMessage } from '../../shared/http-error.util';

@Component({
  selector: 'app-expense-form',
  standalone: false,
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnInit {
  readonly categories: Category[] = ['FOOD', 'TRANSPORT', 'BILLS', 'ENTERTAINMENT', 'HEALTH', 'OTHER'];

  isEditMode = false;
  expenseId?: number;
  errorMessage: string | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Built here rather than as a class field initializer: field initializers run before
    // constructor-parameter assignment, so `this.fb` would still be undefined at that point.
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      category: [null, Validators.required],
      date: [null, Validators.required],
      description: ['', Validators.maxLength(255)]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.expenseId = Number(idParam);
      this.expenseService.getById(this.expenseId).subscribe({
        next: expense => {
          this.form.patchValue({
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            description: expense.description
          });
        },
        error: err => {
          this.errorMessage = getErrorMessage(err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    const expense = this.form.value;

    if (this.isEditMode && this.expenseId !== undefined) {
      this.expenseService.update(this.expenseId, expense).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.errorMessage = getErrorMessage(err);
        }
      });
    } else {
      this.expenseService.create(expense).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          this.errorMessage = getErrorMessage(err);
        }
      });
    }
  }
}
