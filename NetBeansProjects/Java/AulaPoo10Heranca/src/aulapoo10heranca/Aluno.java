package aulapoo10heranca;
/**
 *
 * @author Joel
 */
public class Aluno extends Pessoa {
    //Atributos
    private String matr;
    private String curso;

   
    //Método Interno
    public void cancelarMatr(){
        System.out.println("Matricula será cancelada");
    }
    
    //Método Construtor
   // public Aluno(String matr, String curso, String nome, int idade, String sexo) {
   //     super(nome, idade, sexo);
   //     this.matr = matr;
   //     this.curso = curso;
   // }

    //Método getters e setters

    public String getMatr() {
        return matr;
    }

    public void setMatr(String matr) {
        this.matr = matr;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }
    
    
    
}
