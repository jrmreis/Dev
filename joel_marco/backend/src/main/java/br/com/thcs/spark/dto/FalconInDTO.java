package br.com.thcs.spark.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Setter
public class FalconInDTO {
    private LocalDateTime transactionDatetime;
    private String system;
    private String token;
    private String timezone;
    private String message;

    public void setMessage(String message) {
        this.message = message.substring(0, 167) + "******" + message.substring(173);
    }

}
