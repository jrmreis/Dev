package projetoyoutube;
/**
 *
 * @author Joel
 */
public class Gafanhoto extends Pessoa{
    //Atributos    
    private final String login;
    private int totAssistido;
    //Construtor
    public Gafanhoto(String nome, int idade, String sexo, String login) {
        super(nome, idade, sexo);
        this.login = login;
        this.totAssistido = 0;
        
    }
    //Métodos internos
    public final void viuMaisUm(){ //método final não pode ter filhos (nunca será super classe)
        this.totAssistido++;
    }
    //getters e setters

    public int getTotAssistido() {
        return totAssistido;
    }

    public void setTotAssistido(int totAssistido) {
        this.totAssistido = totAssistido;
    }
    

    //Inserir Código to String

    @Override
    public String toString() {
        return "Gafanhoto{" + super.toString() + "login=" + login + ", totAssistido=" + totAssistido + '}';
                
    }
    
}
