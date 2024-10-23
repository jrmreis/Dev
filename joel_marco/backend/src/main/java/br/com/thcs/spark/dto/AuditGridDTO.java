package br.com.thcs.spark.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Setter
public class AuditGridDTO {
  private LocalDateTime transactionDatetime;
  private String system;
  private String token;
  private String pid;
  private Integer status;
  private String pan;
  private String score;
  private Integer trip;

  public void setPan(String pan) {
    this.pan = pan.substring(0, 6) + "******" + pan.substring(12);
  }

  public String getPan () {
    return this.pan;
  }
}
