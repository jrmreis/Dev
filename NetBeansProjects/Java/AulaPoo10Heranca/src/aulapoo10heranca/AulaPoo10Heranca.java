package aulapoo10heranca;

import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author Joel
 */
public class AulaPoo10Heranca {
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
       //Programa Principal (instanciando objetos das classes)
       Pessoa p1 = new Pessoa();
       Aluno p2 = new Aluno();
       Professor p3 = new Professor();
       Funcionario p4 = new Funcionario();
       
       p1.setNome ("Pedro");
       p2.setNome("Maria");
       p3.setNome("Cláudio");
       p4.setNome("Fabiana");
       
       p1.setSexo("M");
       p2.setSexo("F");
       p3.setSexo("M");
       p4.setSexo("F");
       
       p1.setIdade(18);
       p2.setIdade(22);
       p3.setIdade(24);
       p4.setIdade(30);
       
       
       p2.setCurso("informática");
       p3.setSalario(2500.75f);
       p4.setSetor("Estoque");
       
        System.out.println(p1.toString());
        System.out.println(p2.toString());
        System.out.println(p3.toString());
        System.out.println(p4.toString());
       
       
      // p1.receberAum(550.20);
      // p2.mudarTrabalho();
      // p4.cancelarMatr();
       
       
    }
    
}
