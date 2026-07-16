package com.sathmi.expensetracker.service;

import com.sathmi.expensetracker.dto.ExpenseSummary;
import com.sathmi.expensetracker.exception.ResourceNotFoundException;
import com.sathmi.expensetracker.model.Category;
import com.sathmi.expensetracker.model.Expense;
import com.sathmi.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id " + id));
    }

    public Expense updateExpense(Long id, Expense updated) {
        Expense existing = getExpenseById(id);
        existing.setAmount(updated.getAmount());
        existing.setCategory(updated.getCategory());
        existing.setDate(updated.getDate());
        existing.setDescription(updated.getDescription());
        return expenseRepository.save(existing);
    }

    public void deleteExpense(Long id) {
        Expense existing = getExpenseById(id);
        expenseRepository.delete(existing);
    }

    public ExpenseSummary getSummary() {
        List<Expense> expenses = expenseRepository.findAll();

        BigDecimal total = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<Category, BigDecimal> byCategory = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add)));

        return new ExpenseSummary(total, byCategory);
    }
}
