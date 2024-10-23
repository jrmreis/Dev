/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package precificadortus;

import java.text.NumberFormat;
import java.util.Locale;


/**
 *
 * @author Joel
 */
public class PrecificadorTUS {
    
    //Formatação para R$:

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
         //Formatação para R$
        Locale localeBR = new Locale("pt","BR");
        NumberFormat inteiro = NumberFormat.getInstance();
        NumberFormat dinheiro = NumberFormat.getCurrencyInstance(localeBR);
        NumberFormat percentual = NumberFormat.getPercentInstance(localeBR);
        NumberFormat numberFormat = NumberFormat.getNumberInstance(localeBR);
    
        Custos c = new Custos(8,1,1, 5.4f); //Custos(int qtdTus, int dia, double parc, float pDollar)
        Depreciacao s = new Depreciacao(8,1,1,5.4f);
        
        
        s.calcDep();   //Calcular Depreciação f(dollar).
        c.CalcCustoTus();
        c.CalcPreco();
        c.calcPgto();
        c.calcImp();
        c.CalcHosp();
        
        //System.out.println("Depreciação por Ano: " + dinheiro.format(s.getDepPorAno()));
        System.out.println("Depreciação por TUS: " + dinheiro.format(s.getDepPorTus()));
        System.out.println("Custo por TUS: " + dinheiro.format(c.getCustoPorTus()));
        //System.out.println("Preço do TUS: " + ((s.getDepPorTus() + c.getCustTus())));
        System.out.println("Preço do Tus: " + dinheiro.format(c.getPreco()));
        System.out.println("Total à Prazo: " + dinheiro.format(c.getCustTotalPrazo()));
        System.out.println("Valor da parcela: " + dinheiro.format(c.getValorParcela()));
        System.out.println("30ddl: " + dinheiro.format(c.getValor30ddl()));
        System.out.println("Estimativa Imposto: " + dinheiro.format(c.getSimples()));
        System.out.println("Custo da hospedagem + alimentaçã: " + dinheiro.format(c.getHosp()));
        System.out.println("Custo de Logística: " + dinheiro.format(c.getCustLog()));
    }
    
}
