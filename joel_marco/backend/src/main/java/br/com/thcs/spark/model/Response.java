package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.time.LocalDateTime;

@Entity(name="SPK_AUDIT_RESPONSE")
@Data
@IdClass(SparkId.class)
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    @Id
    @Column(name="ARE_DT_TRAN")
    private LocalDateTime transactionDatetime;
    @Id
    @Column(name="ARE_SYSTEM", columnDefinition="char(16)")
    private String system;
    @Id
    @Column(name="ARE_TOKEN", columnDefinition="char(8)")
    private String token;
    @Column(name="ARE_RETURN_CODE")
    private Integer returnCode;
    @Column(name="ARE_REASON_CODE")
    private Integer reasonCode;
    @Column(name="ARE_SCORE")
    private Integer score;
    @Column(name="ARE_SCORE_ADAPT")
    private Integer scoreAdapt;
    @Column(name="ARE_SCORE_REASON1", columnDefinition="CHAR(4)")
    private String scoreReason1;
    @Column(name="ARE_SCORE_REASON2", columnDefinition="CHAR(4)")
    private String scoreReason2;
    @Column(name="ARE_SCORE_REASON3", columnDefinition="CHAR(4)")
    private String scoreReason3;
    @Column(name="ARE_SCORE_ADAPT_R1", columnDefinition="CHAR(4)")
    private String scoreAdaptR1;
    @Column(name="ARE_SCORE_ADAPT_R2", columnDefinition="CHAR(4)")
    private String scoreAdaptR2;
    @Column(name="ARE_SCORE_ADAPT_R3", columnDefinition="CHAR(4)")
    private String scoreAdaptR3;
    @Column(name="ARE_DECLINE_REASON", columnDefinition="CHAR(3)")
    private String declineReason;
    @Column(name="ARE_USER_DATA1", columnDefinition="CHAR(15)")
    private String userData1;
    @Column(name="ARE_USER_DATA2", columnDefinition="CHAR(15)")
    private String userData2;
    @Column(name="ARE_USER_DATA3", columnDefinition="CHAR(15)")
    private String userData3;
    @Column(name="ARE_USER_DATA4", columnDefinition="CHAR(15)")
    private String userData4;
    @Column(name="ARE_USER_DATA5", columnDefinition="CHAR(15)")
    private String userData5;
}
