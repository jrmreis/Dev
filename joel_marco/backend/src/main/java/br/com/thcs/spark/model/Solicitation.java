package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.time.LocalDateTime;

@Entity(name="SPK_AUDIT_SOLICITATION")
@Data
@IdClass(SparkId.class)
@NoArgsConstructor
@AllArgsConstructor
public class Solicitation {
    @Id
    @Column(name="ASO_DT_TRAN")
    private LocalDateTime transactionDatetime;
    @Id
    @Column(name="ASO_SYSTEM", columnDefinition="char(16)")
    private String system;
    @Id
    @Column(name="ASO_TOKEN", columnDefinition="char(8)")
    private String token;

    @Column(name="ASO_MSGLEN")
    private Integer messageLength;

    @Column(name="ASO_EXTHDRLEN")
    private Integer exthdrLength;
    @Column(name="ASO_MSG_TYPE", columnDefinition="CHAR(3)")
    private String messageType;
    @Column(name="ASO_APP_TOKEN", columnDefinition="CHAR(20)")
    private String appToken;
    @Column(name="ASO_INITTIME", columnDefinition="CHAR(26)")
    private String initTime;
    @Column(name="ASO_SENDTIME", columnDefinition="CHAR(26)")
    private String sendTime;
    @Column(name="ASO_WAIT", columnDefinition="CHAR(1)")
    private String wait;
    @Column(name="ASO_WAIT_INTERVAL")
    private Integer waitInterval;
    @Column(name="ASO_RESPONSE", columnDefinition="CHAR(1)")
    private String response;
    @Column(name="ASO_SOURCE_IP", columnDefinition="CHAR(15)")
    private String sourceIp;
    @Column(name="ASO_SOURCE_IP_RES", columnDefinition="CHAR(90)")
    private String sourceIpResponse;
    @Column(name="ASO_SOURCE", columnDefinition="CHAR(15)")
    private String source;
    @Column(name="ASO_DEST", columnDefinition="CHAR(15)")
    private String destination;


}
