package com.homemade.expensestool.repository;
import com.homemade.expensestool.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {
    List<Expense> findByCategory_Name(String categoryName);

    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
