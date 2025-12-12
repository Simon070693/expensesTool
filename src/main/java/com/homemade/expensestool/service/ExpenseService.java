package com.homemade.expensestool.service;

import com.homemade.expensestool.dto.CreateExpenseRequest;
import com.homemade.expensestool.dto.ExpenseDto;

import java.util.List;

public interface ExpenseService {
    ExpenseDto createExpense(CreateExpenseRequest request);
    List<ExpenseDto> getExpenses();
}
