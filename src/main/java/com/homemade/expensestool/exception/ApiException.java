package com.homemade.expensestool.exception;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}
