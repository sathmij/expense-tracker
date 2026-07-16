export type Category =
  | 'FOOD'
  | 'TRANSPORT'
  | 'BILLS'
  | 'ENTERTAINMENT'
  | 'HEALTH'
  | 'OTHER';

export interface Expense {
  id?: number;
  amount: number;
  category: Category;
  date: string;
  description?: string;
}

export interface ExpenseSummary {
  total: number;
  byCategory: Partial<Record<Category, number>>;
}
