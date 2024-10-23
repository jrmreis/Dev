package br.com.thcs.spark.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

public class StatisticsId implements Serializable {
    private LocalDateTime date;
    private String server;
    private Integer agent;

    public StatisticsId() {};
    public StatisticsId(LocalDateTime date, String server, Integer agent) {
        this.date = date;
        this.server = server;
        this.agent = agent;
    }
}