/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

/**
 *
 * @author Joel
 */
public class Depreciacao extends Custos {

    public static float getDepPorAno() {
        return depPorAno;
    }

    public static void setDepPorAno(float aDepPorAno) {
        depPorAno = aDepPorAno;
    }

    public static float getDepPorTus() {
        return depPorTus;
    }

    public static void setDepPorTus(float aDepPorTus) {
        depPorTus = aDepPorTus;
    }
    //Atributos
    
    private float pDollar;
    private final float pCappo = 5300/3.2f;
    private final float p6100a = 20000/3.2f;
    private int qtdTusAno;
    private static float depPorAno;
    public static float depPorTus;

    
     //Construtor

    public Depreciacao(int qtdTus, int dia, double parc, float pDollar, float n) {
        super(qtdTus, dia, parc, pDollar, n);
        this.pDollar = pDollar;
        
    }

    
   

//Métodos
    
    public void calcDep(){
        qtdTusAno = ((int)(qtdTus) + 1);
        float c;                            //Depreciação por ano
        float dpt;
        c = (((pCappo*0.6f) + (p6100a*0.6f))*pDollar)/5;
        dpt = c/qtdTusAno;                  //Depreciação por TUS
        
        depPorAno = c;
        depPorTus = dpt;
        
    }
    
    
    
}
