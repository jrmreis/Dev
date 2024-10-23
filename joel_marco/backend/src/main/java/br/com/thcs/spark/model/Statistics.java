package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SPK_STATISTICS")
@IdClass(StatisticsId.class)
public class Statistics {
    @Id
    @Column(name="STA_DT_INSERT")
    private LocalDateTime date;
    @Id
    @Column(name="STA_NM_SERVER", columnDefinition="char(16)")
    private String server;
    @Id
    @Column(name="STA_ID_AGENT")
    private Integer agent;
    @Column(name="STA_QT_SEND")
    private Integer sent;
    @Column(name="STA_QT_RECEIVE")
    private Integer received;
    @Column(name="STA_CPU_TOTAL")
    private Integer CPUTotal;
    @Column(name="STA_CPU_ECLAGE")
    private Integer CPUEclage;
    @Column(name="STA_CPU_SPARK")
    private Integer CPUSpark;
    @Column(name="STA_CPU_ECOAGE")
    private Integer CPUEcoage;

    public Statistics(String server, String requestTime, Integer sent, Integer agent) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(requestTime, formatter);
        this.server = server;
        this.date = dateTime;
        this.sent = sent;
        this.agent = agent;
    }
}
