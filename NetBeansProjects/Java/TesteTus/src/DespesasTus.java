/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Joel
 */
public class DespesasTus extends CustoTus{
    //Atributos
    float valorDollarCalibCappo = (5300f/3.12f);
    float valorADollarDataLog6100a = (19351.5f/3.19f);
    float valorAtualDollar;
    float depTus;
//Método Construtor
    public DespesasTus(int qtdTus, int dia, double parc, float vDH) {
        super(qtdTus, dia, parc);
        valorAtualDollar = vDH;
    }

    public float getDepTus() {
        return depTus;
    }

    //getters e setters
    public void setDepTus(float depTus) {
        this.depTus = depTus;
    }

    public float getValorDollarCalibCappo() {
        return valorDollarCalibCappo;
    }

    public void setValorDollarCalibCappo(float valorDollarCalibCappo) {
        this.valorDollarCalibCappo = valorDollarCalibCappo;
    }

    public float getValorADollarDataLog6100a() {
        return valorADollarDataLog6100a;
    }

    public void setValorADollarDataLog6100a(float valorADollarDataLog6100a) {
        this.valorADollarDataLog6100a = valorADollarDataLog6100a;
    }

    public float getValorAtualDollar() {
        return valorAtualDollar;
    }

    public void setValorAtualDollar(float valorAtualDollar) {
        this.valorAtualDollar = valorAtualDollar;
    }
    //método interno
    public void calcDep(float d){
        d = ((valorDollarCalibCappo*0.3f + valorADollarDataLog6100a*0.8f)*valorAtualDollar)/5;  //depreciação 30%Calibrador 80%DataLogger em 5 anos
        System.out.println("Depreciação por ano " + dinheiro.format(d));
        System.out.println("Depreciação por TUS " + dinheiro.format(d/(qtdTus+2)));
        
        this.depTus = d/(qtdTus+2);
        System.out.println(Float.toString(depTus));
    }
}