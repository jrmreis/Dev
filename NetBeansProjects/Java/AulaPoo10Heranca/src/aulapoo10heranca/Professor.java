package aulapoo10heranca;
/**
 *
 * @author Joel
 */
public class Professor extends Pessoa {
    //Atributos
    private String especialidade;
    private float salario;
    
    //Métodos internos
    public void receberAum(float aum){
        this.salario += aum;
    }
    //Método Construtor
    //public Professor(String especialidade, float salario, String nome, int idade, String sexo) {
    //    super(nome, idade, sexo);
    //    this.especialidade = especialidade;
    //    this.salario = salario;
    //}
    //Métodos getters e setters

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
