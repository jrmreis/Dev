
/**
 *
 * @author Joel
 */
public class Preco {
    //Atributos
    private DespesasTus depTus;
    private CustoTus custoPorTus;
    private float preco;
    
    //Construtor

    public Preco(DespesasTus depTus, CustoTus custoPorTus) {
        this.depTus = depTus;
        this.custoPorTus = custoPorTus;
    }
    
    
    
    //getters and setters

    public DespesasTus getDepTus() {
        return depTus;
    }

    public void setDepTus(DespesasTus depTus) {
        this.depTus = depTus;
    }

    public CustoTus getCustoPorTus() {
        return custoPorTus;
    }

    public void setCustoPorTus(CustoTus custoPorTus) {
        this.custoPorTus = custoPorTus;
    }
    
    //Método
    public void CalcularPreco(CustoTus custoPorTus, DespesasTus depTus){
        float p;
        //p = DespesasTus.depTus; /*+ CustoTus.custoPorTus;*/
        System.out.println("preço é " /*+ Float.toString(CustoTus.custoPorTus)*/);
    }
}
