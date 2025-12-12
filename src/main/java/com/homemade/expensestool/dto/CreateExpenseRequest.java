package com.homemade.expensestool.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateExpenseRequest {
    private String description;
    private Double amount;
    private LocalDate date;
    private String category;
}
