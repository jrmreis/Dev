/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fatorial;

/**
 *
 * @author Joel
 */
public class Fatorial {
    //Atributos
    private int num = 0;
    private int fat = 1;
    private String formula = "";
    
    //métodos
    public void calcValor (int n){
        num = n;
        int f = 1;
        String s = "";
        for (int c = n; c>1; c--){
            f *= c;
            s += c + " x ";
        }
        fat = f;
        formula = s + "1";
    }
    public int getFatorial() {
        return fat;
    }
    public String getFormula (){
        return formula;
    }
}
