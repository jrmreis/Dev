package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;


import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SPK_AUDIT")
@IdClass(SparkId.class)
public class Audit {

    public Audit(LocalDateTime transactionDatetime, String system, Integer status, String pan) {
        this.transactionDatetime = transactionDatetime;
        this.system = system;
        this.status = status;
        this.pan = pan;
    }

    @Id
    @Column(name="AUD_DT_TRAN")
    private LocalDateTime transactionDatetime;

    @Id
    @Column(name="AUD_SYSTEM", columnDefinition = "char(16)")
    private String system;

    @Id
    @Column(name="AUD_TOKEN", columnDefinition = "char(8)")
    private String token;

    @Column(name="AUD_PID", columnDefinition = "char(8)")
    private String pid;

    @Column(name="AUD_TYPE")
    private Integer type;

    @Column(name="AUD_SCORE", columnDefinition = "char(3)")
    private String score;

    @Column(name="AUD_PAN", columnDefinition = "char(19)")
    private String pan;

    @Column(name="AUD_STATUS")
    private Integer status;

    @Column(name="AUD_TRIP")
    private Integer trip;

    @Column(name="AUD_TIME_ZONE", columnDefinition = "char(6)")
    private String timezone;

    @Column(name="AUD_CLOCK1")
    private LocalDateTime clock1;

    @Column(name="AUD_CLOCK2")
    private LocalDateTime clock2;

    @Column(name="AUD_CLOCK3")
    private LocalDateTime clock3;

    @Column(name="AUD_CLOCK4")
    private LocalDateTime clock4;

    @Column(name="AUD_CLOCK5")
    private LocalDateTime clock5;

    @Column(name="AUD_CLOCK6")
    private LocalDateTime clock6;

    @Column(name="AUD_CLOCK7")
    private LocalDateTime clock7;

    @Column(name="AUD_CLOCK8")
    private LocalDateTime clock8;

    @Column(name="AUD_CLOCK9")
    private LocalDateTime clock9;

    @Column(name="AUD_CLOCK10")
    private LocalDateTime clock10;

    public LocalDateTime getTransactionDatetime() {
        return this.transactionDatetime;
    }

    public String getPan() {
        return this.pan;
    }
}
