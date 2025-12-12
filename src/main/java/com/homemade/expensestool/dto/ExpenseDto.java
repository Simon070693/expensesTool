package com.homemade.expensestool.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class ExpenseDto {
    private UUID id;
    private String description;
    private Double amount;
    private LocalDate date;
    private String categoryName;
}
