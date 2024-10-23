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
public class Aula11 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        Aluno a1 = new Aluno();
        a1.setNome("Cláudio");
        a1.pagarMensalidade();

        Bolsista b1 = new Bolsista();
        b1.setNome("Jubileu");
        b1.pagarMensalidade();
    }

}
