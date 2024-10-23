/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package aula11;

/**
 *
 * @author Línyker
 */
public final class Professor extends Pessoa {

    //Atributos
    private String especialidade;
    private float salario;

    //Métodos
    public void receberAum(float salario) {
        this.setSalario(this.getSalario() + salario);
    }

    //Métodos Especiais
    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public float getSalario() {
        return salario;
    }

    public void setSalario(float salario) {
        this.salario = salario;
    }

}
