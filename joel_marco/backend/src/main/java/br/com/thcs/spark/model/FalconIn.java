package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.time.LocalDateTime;



@Entity(name="SPK_AUDIT_FALCON_IN")
@Data
@IdClass(SparkId.class)
@NoArgsConstructor
@AllArgsConstructor
public class FalconIn {
    @Id
    @Column(name="AFI_DT_TRAN")
    private LocalDateTime transactionDatetime;

    @Id
    @Column(name="AFI_SYSTEM", columnDefinition="char(16)")
    private String system;

    @Id
    @Column(name="AFI_TOKEN", columnDefinition="char(8)")
    private String token;

    @Column(name="AFI_TIME_ZONE", columnDefinition="char(6)")
    private String timezone;

    @Column(name="AFI_MESG_IN", columnDefinition="varchar2(4000)")
    private String message;
}
