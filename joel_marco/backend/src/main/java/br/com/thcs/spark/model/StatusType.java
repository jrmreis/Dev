package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SPK_STATUS_TYPE")
public class StatusType {
    @Id
    @Column(name="STT_STATUS")
    private Integer status;
    @Column(name="STT_DESCRIPTION", columnDefinition="char(30)")
    private String description;
}
