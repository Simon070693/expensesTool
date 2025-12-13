import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ExpenseService, CreateExpenseRequest, Expense } from '../../services/expense';
import { CategoryService, Category } from '../../services/category';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss'
})
export class ExpenseFormComponent implements OnInit {
  description = signal('');
  amount = signal<number | null>(null);
  date = signal('');
  categorySearch = signal('');
  
  categories = signal<Category[]>([]);
  filteredCategories = signal<Category[]>([]);
  selectedCategory: Category | null = null;
  showCreateCategory = signal(false);
  newCategoryName = signal('');
  
  expenses = signal<Expense[]>([]);
  loadingExpenses = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadExpenses();
    this.setTodayDate();
  }

  setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    this.date.set(today);
  }

  onAmountChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const numValue = parseFloat(value);
    this.amount.set(isNaN(numValue) ? null : numValue);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.filteredCategories.set(categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.error.set('Failed to load categories');
      }
    });
  }

  loadExpenses() {
    this.loadingExpenses.set(true);
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        // Sort by date descending (newest first)
        expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.expenses.set(expenses);
        this.loadingExpenses.set(false);
      },
      error: (err) => {
        console.error('Error loading expenses:', err);
        this.loadingExpenses.set(false);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getTotalAmount(): number {
    return this.expenses().reduce((sum, e) => sum + e.amount, 0);
  }

  onCategorySearch() {
    const searchTerm = this.categorySearch().toLowerCase().trim();
    
    if (!searchTerm) {
      this.filteredCategories.set(this.categories());
      this.selectedCategory = null;
      this.showCreateCategory.set(false);
      return;
    }

    const filtered = this.categories().filter(cat =>
      cat.name.toLowerCase().includes(searchTerm)
    );

    this.filteredCategories.set(filtered);

    if (filtered.length === 0) {
      this.showCreateCategory.set(true);
      this.newCategoryName.set(searchTerm);
      this.selectedCategory = null;
    } else if (filtered.length === 1 && filtered[0].name.toLowerCase() === searchTerm) {
      this.selectedCategory = filtered[0];
      this.showCreateCategory.set(false);
    } else {
      this.selectedCategory = null;
      this.showCreateCategory.set(false);
    }
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.categorySearch.set(category.name);
    this.showCreateCategory.set(false);
    this.filteredCategories.set(this.categories());
  }

  async createCategoryAndExpense() {
    const categoryName = this.newCategoryName().trim();
    if (!categoryName) {
      this.error.set('Category name is required');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const newCategory = await firstValueFrom(this.categoryService.createCategory({ name: categoryName }));
      if (newCategory) {
        this.selectedCategory = newCategory;
        this.categorySearch.set(newCategory.name);
        this.loadCategories();
        await this.submitExpense();
      }
    } catch (err: any) {
      console.error('Error creating category:', err);
      this.error.set(err.error?.message || 'Failed to create category');
    } finally {
      this.loading.set(false);
    }
  }

  async submitExpense() {
    if (!this.description().trim()) {
      this.error.set('Description is required');
      return;
    }

    if (!this.amount() || this.amount()! <= 0) {
      this.error.set('Amount must be greater than 0');
      return;
    }

    if (!this.date()) {
      this.error.set('Date is required');
      return;
    }

    const categoryName = this.selectedCategory?.name || this.categorySearch().trim();
    if (!categoryName) {
      this.error.set('Please select or create a category');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(false);

    const request: CreateExpenseRequest = {
      description: this.description().trim(),
      amount: this.amount()!,
      date: this.date(),
      category: categoryName
    };

    try {
      await firstValueFrom(this.expenseService.createExpense(request));
      this.success.set(true);
      this.resetForm();
      this.loadExpenses(); // Reload expenses list
      
      setTimeout(() => {
        this.success.set(false);
      }, 3000);
    } catch (err: any) {
      console.error('Error creating expense:', err);
      this.error.set(err.error?.message || 'Failed to create expense');
    } finally {
      this.loading.set(false);
    }
  }

  resetForm() {
    this.description.set('');
    this.amount.set(null);
    this.setTodayDate();
    this.categorySearch.set('');
    this.selectedCategory = null;
    this.showCreateCategory.set(false);
    this.newCategoryName.set('');
    this.filteredCategories.set(this.categories());
  }
}

