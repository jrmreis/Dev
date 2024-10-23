package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import java.io.Serializable;
import java.time.LocalDateTime;

class SAFId implements Serializable {
    private LocalDateTime date;
    private String pan;
    private String token;

    public SAFId() {};
    public SAFId(LocalDateTime date, String pan, String token) {
        this.date = date;
        this.pan = pan;
        this.token = token;
    }
}


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SPK_SAF")
@IdClass(SAFId.class)
public class SAF {
    @Id
    @Column(name="SAF_PAN", columnDefinition="varchar2(19)")
    private String pan;
    @Id
    @Column(name="SAF_DT_TRAN")
    private LocalDateTime date;
    @Id
    @Column(name="SAF_TOKEN", columnDefinition="char(8)")
    private String token;
    @Column(name="SAF_TYPE")
    private Integer type;
    @Column(name="SAF_TRAN", columnDefinition="varchar2(4000)")
    private String transaction;
}
