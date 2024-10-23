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
public final class Tecnico extends Aluno {

    //Atributos
    private int registroProfissional;

    //Métodos
    public void praticar() {
        System.out.println(this.getNome() + " está praticando!");
    }

    //Métodos Especiais
    public int getRegistroProfissional() {
        return registroProfissional;
    }

    public void setRegistroProfissional(int registroProfissional) {
        this.registroProfissional = registroProfissional;
    }

}
