package com.homemade.expensestool.mapper;

import com.homemade.expensestool.dto.CategoryDto;
import com.homemade.expensestool.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto dto);
}
