package aulapoo10heranca;
/**
 *
 * @author Joel
 */
public class Funcionario extends Pessoa{
    //Atributos
    private String setor;
    private boolean trabalho;
    
    //Métodos internos
    public void mudarTrabalho(){
        this.trabalho = !this.trabalho;
    }
    //Método Construtor

   // public Funcionario(String setor, boolean trabalho, String nome, int idade, String sexo) {
   //     super(nome, idade, sexo);
   //     this.setor = setor;
   //     this.trabalho = trabalho;
   // }

    
    
    //Método setters e getters

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public boolean isTrabalho() {
        return trabalho;
    }

    public void setTrabalho(boolean trabalho) {
        this.trabalho = trabalho;
    }

    
    
}
