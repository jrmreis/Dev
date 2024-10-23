/**
 *
 * @author Joel
 */
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Scanner;


public class CustoTus implements InterfaceTeste {
    //Atributos (variáveis)
    private float custTC;
    private float custCalTC;
    private float custCalFlu;
    private float custLog;
    private float custHosp;
    private float custMo;
    private float provTC;
    private int qtdTC;
    private int hMonDes;
    public int qtdTus;
    private int dia;
    private int depTC;
    private int depCalTC;
    private int depCalCappo;
    private float risco;
    private double parc;
    private double txJuros;
    public float custoPorTus;
    
    
   //Métodos Especiais:
                Locale localeBR = new Locale("pt","BR");
      		NumberFormat inteiro = NumberFormat.getInstance();
		NumberFormat dinheiro = NumberFormat.getCurrencyInstance(localeBR);
		NumberFormat percentual = NumberFormat.getPercentInstance(localeBR);
		NumberFormat numberFormat = NumberFormat.getNumberInstance(localeBR);
         //Construtor

    public CustoTus(int qtdTus, int dia, double parc) {
        this.custTC = 300; //Seritec 3x3000mm ago/2020
        this.custCalTC = (50); //Seritec 3mm out/2019
        this.custCalFlu = 1000; //Ecil 900 + 100 entrega ago/2020
        this.custLog = (450+250); //Avião, taxi 250,00.
        this.custHosp = (150+50); //diária R$150,00, alimentação R$50,00 dia
        this.custMo = (150); //Hora Eng. R$150,00/h.
        this.hMonDes = 5;  //Horas de Montagem e Desmontagem TUS
        this.provTC = (0.23f*qtdTC*custTC); //provisão perda de TC durante desmontagem TUS
        this.qtdTC = 9; //Quantidade de TC por TUS
        this.qtdTus = qtdTus; //Quantidade de fornos
        this.dia = dia; //Quantidade de dias
        this.depTC = 6; //Qtd de TUS para depreciar 100%
        this.depCalTC = 3; //Quantidade de TUS por Calibração anual TC
        this.depCalCappo = 15; //Quantidade de TUS por Calibração à cada 5 anos calibrador Cappo XP
        this.risco = 1/3; //Risco de enroscar TC na saída para Têmpera.
        this.parc = parc; //Pacelamento
        this.txJuros = 0.01d; //Taxa de Juros.
        
    }
   //getters e setters automáticos - encapsulado --> private
    public int getDia() {    
        return dia;
    }
 
    public void setDia(int dia) {
        this.dia = dia;
    }

    private float getCustTC() {
        return custTC;
    }

    public float getCustMo() {
        return custMo;
    }

    public void setCustMo(float custMo) {
        this.custMo = custMo;
    }

    public int getQtdTus() {
        return qtdTus;
    }

    public void setQtdTus(int qtdTus) {
        this.qtdTus = qtdTus;
    }

    private float getCustHosp() {
        return custHosp;
    }

    private void setCustHosp(float custHosp) {
        this.custHosp = custHosp;
    }

    private void setCustTC(float custTC) {
        this.custTC = custTC;
    }

    public float getCustCalTC() {
        return custCalTC;
    }

    private void setCustCalTC(float custCalTC) {
        this.custCalTC = custCalTC;
    }

    private float getCustCalFlu() {
        return custCalFlu;
    }

    private void setCustCalFlu(float custCalFlu) {
        this.custCalFlu = custCalFlu;
    }

    private float getCustLog() {
        return custLog;
    }

    private void setCustLog(float custLog) {
        this.custLog = custLog;
    }
    
    //Implementar todos os Métodos Abstratos

    @Override
    public void calcular() {
        float f;
        //DespesasTus d = DespesasTus.depTus.getValue();
        f = (qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo)
             /*+ (depTus)*/));
                
        //System.out.printf("Total do custo é R$%.2f %n", f + (custLog)+(dia*custHosp)); //printf %.2, ==> 2 casas decimais
        System.out.println("Total do custo é " + dinheiro.format(f + (custLog)+(dia*custHosp)));
        this.custoPorTus = (f + (custLog)+(dia*custHosp));
    }
    @Override
    public void calcPgto() {
        double p = 0;  // coloqui zero para testar os blocos, caso houvesse fallha no fluxo o resultado seria zero.
        p=(qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo)
                + (custLog)+(dia*custHosp)));
        
        if ((int)parc > 1) {
            p = (((qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo)
                )+ (custLog)+(dia*custHosp))*(Math.pow((1+txJuros), (int)parc))));
            
        //System.out.printf("Custo Pgto R$%.2f %n", + p);
        System.out.println("Custo Total à Prazo: " + dinheiro.format(p));
        System.out.println("Pgto dividido em " + inteiro.format((int)parc) + "x " + "de " + dinheiro.format(p/(int)parc));
        } else {
           
        System.out.println("30ddl " + dinheiro.format(p));
        }
    }

    @Override
    public void calcLog() {
        float l;
        l = (custLog);
        System.out.println("O custo de Logistica é " + dinheiro.format(l));
    }
    
    @Override
    public void calcImp(){
        float i;
        i = (0.05f*(qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo)
                )+(custLog)
                +  (dia*custHosp))); //Simples
        System.out.println("Imposto estimado em " + dinheiro.format(i));
    }

    @Override
    public void calcHosp() {
        System.out.println("Custo da hospedagem + alimentação é " + dinheiro.format((dia*custHosp)));
    }

    
}
