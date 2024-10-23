package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;


@Entity(name="SPK_Fields")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(FieldsId.class)
public class Fields {
    @Id
    @Column(name="FLD_TYPE", columnDefinition="char(3)")
    private String type;
    @Id
    @Column(name="FLD_FLOW", columnDefinition="char(1)")
    private String flow;
    @Id
    @Column(name="FLD_NAME", columnDefinition="char(30)")
    private String name;
    @Column(name="FLD_DESCRIPTION", columnDefinition="char(50)")
    private String description;
    @Column(name="FLD_POSITION")
    private Integer position;
    @Column(name="FLD_LENGTH")
    private Integer length;
}
