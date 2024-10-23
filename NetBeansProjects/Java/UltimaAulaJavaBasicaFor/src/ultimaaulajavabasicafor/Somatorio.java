/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ultimaaulajavabasicafor;

/**
 *
 * @author Joel
 */
public class Somatorio {
    
    public static String contador(int i, int f){  //isto é uma função, pois é um método estático
        String s = "";
        for (int c = i; f >= c; c++){
            s += c + " ";
        }
        return s;                                 //resposta da função, pode ser
                                                  //acessada sem instaciamento da classe
                                                  //basta chamar a Classe.método(variáveis da função)
    }
    
}
