package com.homemade.expensestool.service;

import com.homemade.expensestool.dto.CreateExpenseRequest;
import com.homemade.expensestool.dto.ExpenseDto;
import com.homemade.expensestool.entity.Category;
import com.homemade.expensestool.entity.Expense;
import com.homemade.expensestool.exception.ApiException;
import com.homemade.expensestool.mapper.ExpenseMapper;
import com.homemade.expensestool.repository.CategoryRepository;
import com.homemade.expensestool.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final ExpenseMapper expenseMapper;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository, CategoryRepository categoryRepository, ExpenseMapper expenseMapper) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
        this.expenseMapper = expenseMapper;
    }

    @Override
    public ExpenseDto createExpense(CreateExpenseRequest request) {
        Category category = categoryRepository.findByName(request.getCategory())
                .orElseThrow(() -> new ApiException("Category not found"));

        Expense expense = expenseMapper.toEntity(request);
        expense.setCategory(category);

        Expense savedExpense = expenseRepository.save(expense);

        return expenseMapper.toDto(savedExpense);
    }

    @Override
    public List<ExpenseDto> getExpenses() {
        return expenseRepository.findAll().stream()
                .map(expenseMapper::toDto)
                .collect(Collectors.toList());
    }
}
