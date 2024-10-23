package br.com.thcs.spark.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;
import java.util.Date;


class LSBId implements Serializable {
    private String pan;
    private String workflow;
    public LSBId () {}
    public LSBId(String pan, String workflow) {
        this.pan = pan;
        this.workflow = workflow;
    }
}

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="SPK_LSDB")
@IdClass(LSBId.class)
public class LSDB {
    @Id
    @Column(name="LDB_PAN", columnDefinition="char(19")
    private String pan;

    @Id
    @Column(name="LDB_WORKFLOW", columnDefinition="char(16)")
    private String workflow;

    @Column(name="LDB_DT_INSERT")
    private Date date;

    @Column(name="LDB_SCORE", columnDefinition="varchar2(512)")
    private String score;

}
