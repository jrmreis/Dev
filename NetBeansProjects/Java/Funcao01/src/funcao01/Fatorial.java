/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package funcao01;

/**
 *
 * @author Joel
 */
public class Fatorial {
    //Atributos
    private int num = 0;
    public int fat = 1;
    public String formula = "";
    
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
