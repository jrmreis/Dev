package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name="SPK_AUDIT_USER")
@IdClass(SparkId.class)
public class SpkAuditUser {
    @Id
    @Column(name="AUS_DT_TRAN")
    private LocalDateTime transactionDatetime;
    @Id
    @Column(name="AUS_SYSTEM", columnDefinition="char(16)")
    private String system;
    @Id
    @Column(name="AUS_TOKEN", columnDefinition="char(8)")
    private String token;

    @Column(name="AUS_MESG_USER", columnDefinition="varchar2(1536)")
    private String message;
}
