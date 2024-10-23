/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package connection;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Joel
 */
@Entity
@Table(name = "NETBEANSJOEL")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Netbeansjoel.findAll", query = "SELECT n FROM Netbeansjoel n")
    , @NamedQuery(name = "Netbeansjoel.findByIdRegistro", query = "SELECT n FROM Netbeansjoel n WHERE n.idRegistro = :idRegistro")
    , @NamedQuery(name = "Netbeansjoel.findByNome", query = "SELECT n FROM Netbeansjoel n WHERE n.nome = :nome")
    , @NamedQuery(name = "Netbeansjoel.findByCpf", query = "SELECT n FROM Netbeansjoel n WHERE n.cpf = :cpf")})
public class Netbeansjoel implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID_REGISTRO")
    private BigDecimal idRegistro;
    @Size(max = 20)
    @Column(name = "NOME")
    private String nome;
    @Size(max = 14)
    @Column(name = "CPF")
    private String cpf;

    public Netbeansjoel() {
    }

    public Netbeansjoel(BigDecimal idRegistro) {
        this.idRegistro = idRegistro;
    }

    public BigDecimal getIdRegistro() {
        return idRegistro;
    }

    public void setIdRegistro(BigDecimal idRegistro) {
        this.idRegistro = idRegistro;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idRegistro != null ? idRegistro.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Netbeansjoel)) {
            return false;
        }
        Netbeansjoel other = (Netbeansjoel) object;
        if ((this.idRegistro == null && other.idRegistro != null) || (this.idRegistro != null && !this.idRegistro.equals(other.idRegistro))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "connection.Netbeansjoel[ idRegistro=" + idRegistro + " ]";
    }
    
}
