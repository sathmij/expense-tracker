package com.sathmi.expensetracker.service;

import com.sathmi.expensetracker.dto.ExpenseSummary;
import com.sathmi.expensetracker.exception.ResourceNotFoundException;
import com.sathmi.expensetracker.model.Category;
import com.sathmi.expensetracker.model.Expense;
import com.sathmi.expensetracker.repository.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

    @Test
    void createExpense_savesAndReturnsExpense() {
        Expense expense = buildExpense(1L, Category.FOOD, new BigDecimal("50.00"));
        when(expenseRepository.save(expense)).thenReturn(expense);

        Expense result = expenseService.createExpense(expense);

        assertEquals(expense, result);
        verify(expenseRepository).save(expense);
    }

    @Test
    void deleteExpense_throwsResourceNotFoundWhenIdDoesNotExist() {
        when(expenseRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> expenseService.deleteExpense(99L));
        verify(expenseRepository, never()).delete(any());
    }

    @Test
    void getSummary_calculatesTotalsOverallAndPerCategory() {
        List<Expense> expenses = List.of(
                buildExpense(1L, Category.FOOD, new BigDecimal("100.00")),
                buildExpense(2L, Category.FOOD, new BigDecimal("20.00")),
                buildExpense(3L, Category.TRANSPORT, new BigDecimal("45.50"))
        );
        when(expenseRepository.findAll()).thenReturn(expenses);

        ExpenseSummary summary = expenseService.getSummary();

        assertEquals(new BigDecimal("165.50"), summary.total());
        assertEquals(new BigDecimal("120.00"), summary.byCategory().get(Category.FOOD));
        assertEquals(new BigDecimal("45.50"), summary.byCategory().get(Category.TRANSPORT));
    }

    private Expense buildExpense(Long id, Category category, BigDecimal amount) {
        Expense expense = new Expense();
        expense.setId(id);
        expense.setCategory(category);
        expense.setAmount(amount);
        expense.setDate(LocalDate.now());
        expense.setDescription("test expense");
        return expense;
    }
}
