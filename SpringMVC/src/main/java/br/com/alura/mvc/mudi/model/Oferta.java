package br.com.alura.mvc.mudi.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Oferta {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="MYSEQUENCE")
	@SequenceGenerator(sequenceName="mySequence",initialValue = 1, allocationSize = 1, name="MYSEQUENCE")
	private Long id;
	
	private BigDecimal valor;
	
	private LocalDate dataDaEntrega;
	
	private String comentario;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Pedido pedido;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public LocalDate getDataDaEntrega() {
		return dataDaEntrega;
	}

	public void setDataDaEntrega(LocalDate dataDaEntrega) {
		this.dataDaEntrega = dataDaEntrega;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}
	
	
}
