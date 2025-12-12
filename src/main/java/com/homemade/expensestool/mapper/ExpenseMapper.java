package com.homemade.expensestool.mapper;

import com.homemade.expensestool.dto.CreateExpenseRequest;
import com.homemade.expensestool.dto.ExpenseDto;
import com.homemade.expensestool.entity.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    @Mapping(target = "categoryName", source = "category.name")
    ExpenseDto toDto(Expense expense);

    Expense toEntity(ExpenseDto dto);

    @Mapping(target = "category", source = "category", ignore = true)
    Expense toEntity(CreateExpenseRequest createExpenseRequest);

}
