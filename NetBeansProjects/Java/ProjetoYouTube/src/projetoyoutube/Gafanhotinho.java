package projetoyoutube;

/**
 *
 * @author Joel
 */
public class Gafanhotinho extends Gafanhoto{
    
    public Gafanhotinho(String nome, int idade, String sexo, String login) {
        super(nome, idade, sexo, login);
    }

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

    public float getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(float experiencia) {
        this.experiencia = experiencia;
    }
    //Impossível inserir to String (gafanhoto tem método interno final)
    
    
}
