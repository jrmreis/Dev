package br.com.thcs.spark.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class SparkId implements Serializable {
    private LocalDateTime transactionDatetime;
    private String system;
    private String token;

    public SparkId() {};
    public SparkId(LocalDateTime transactionDatetime, String system, String token) {
        this.transactionDatetime = transactionDatetime;
        this.system = system;
        this.token = token;
    }

    public SparkId(String strDatetime, String system, String token) {

        DateTimeFormatter formatter = strDatetime.length() == 25
            ? DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSS")
            : DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");

        this.transactionDatetime = LocalDateTime.parse(strDatetime, formatter);
        this.system = system;
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SparkId)) return false;
        SparkId sparkId = (SparkId) o;
        return transactionDatetime.equals(sparkId.transactionDatetime) &&
                system.equals(sparkId.system) &&
                token.equals(sparkId.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(transactionDatetime, system, token);
    }
}