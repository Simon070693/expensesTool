package com.homemade.expensestool.controller;

import com.homemade.expensestool.dto.CreateExpenseRequest;
import com.homemade.expensestool.dto.ExpenseDto;
import com.homemade.expensestool.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<ExpenseDto> getExpenses() {
        return expenseService.getExpenses();
    }

    @PostMapping
    public ExpenseDto createExpense(@RequestBody CreateExpenseRequest request) {
        return expenseService.createExpense(request);
    }
}


