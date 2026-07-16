package com.sathmi.expensetracker.dto;

import com.sathmi.expensetracker.model.Category;

import java.math.BigDecimal;
import java.util.Map;

public record ExpenseSummary(BigDecimal total, Map<Category, BigDecimal> byCategory) {
}
