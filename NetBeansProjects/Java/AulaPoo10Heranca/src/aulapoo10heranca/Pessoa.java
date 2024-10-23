package aulapoo10heranca;
/**
 *
 * @author Joel
 */
public class Pessoa {
    //Atributos
    private String nome;
    private int idade;
    private String sexo;
    
    //Métodos Públicos Interno
    public void fazerAniv(){
        this.idade ++; 
    }
    
    //Método Construtor

    //public Pessoa(String nome, int idade, String sexo) {
    //    this.nome = nome;
    //    this.idade = idade;
    //    this.sexo = sexo;
    //}
    //Métodos Especiais (getters e setters)    

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getIdade() {
        return idade;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
//Método toString
    @Override
    public String toString() {
        return "Pessoa{" + "nome=" + nome + ", idade=" + idade + ", sexo=" + sexo + '}';
    }
    

    
    
}
