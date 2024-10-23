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
public class UltimaAulaJavaBasicaFor {

       // static void soma(int a, int b){        //static torna o método uma função local
       // int c = a + b;
       //         System.out.println(Integer.toString(c));
    //}
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        //soma(2,3);  //não é possivel encontrar o método soma, se ele não for static ou instanciado de outra classe

         System.out.println("Vai começar a contagem...");
         System.out.println(Somatorio.contador(1,5));
     
     
     
     
    }
    
}
