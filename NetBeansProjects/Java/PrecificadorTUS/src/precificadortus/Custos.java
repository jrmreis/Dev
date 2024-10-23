/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package precificadortus;


/**
 *
 * @author Joel
 */
public class Custos {


    //Atributos (variáveis)(campo)
    public float custTus;
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
    public float preco;
    public double custTotalPrazo;
    public double valorParcela;
    public double valor30ddl;
    private float simples;
    private float hosp;
    

                
    //Construtor

    public Custos(int qtdTus, int dia, double parc, float pDollar) {
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

    
    //getters e setters

    public float getHosp() {
        return hosp;
    }

    public void setHosp(float hosp) {
        this.hosp = hosp;
    }
    
    
    
    public double getCustTotalPrazo() {
        return custTotalPrazo;
    }

    public void setCustTotalPrazo(double custTotalPrazo) {
        this.custTotalPrazo = custTotalPrazo;
    }

    public double getValorParcela() {
        return valorParcela;
    }

    public void setValorParcela(double valorParcela) {
        this.valorParcela = valorParcela;
    }

    public double getValor30ddl() {
        return valor30ddl;
    }


    public void setValor30ddl(double valor30ddl) {
        this.valor30ddl = valor30ddl;
    }

    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }



    public float getCustTus() {
        return custTus;
    }



    public float getCustTC() {
        return custTC;
    }

    public void setCustTC(float custTC) {
        this.custTC = custTC;
    }

    public float getCustCalTC() {
        return custCalTC;
    }

    public void setCustCalTC(float custCalTC) {
        this.custCalTC = custCalTC;
    }

    public float getCustCalFlu() {
        return custCalFlu;
    }

    public void setCustCalFlu(float custCalFlu) {
        this.custCalFlu = custCalFlu;
    }

    public float getCustLog() {
        return custLog;
    }

    public void setCustLog(float custLog) {
        this.custLog = custLog;
    }

    public float getCustHosp() {
        return custHosp;
    }

    public void setCustHosp(float custHosp) {
        this.custHosp = custHosp;
    }

    public float getCustMo() {
        return custMo;
    }

    public void setCustMo(float custMo) {
        this.custMo = custMo;
    }

    public float getProvTC() {
        return provTC;
    }

    public void setProvTC(float provTC) {
        this.provTC = provTC;
    }

    public int getQtdTC() {
        return qtdTC;
    }

    public void setQtdTC(int qtdTC) {
        this.qtdTC = qtdTC;
    }

    public int gethMonDes() {
        return hMonDes;
    }

    public void sethMonDes(int hMonDes) {
        this.hMonDes = hMonDes;
    }

    public int getQtdTus() {
        return qtdTus;
    }

    public void setQtdTus(int qtdTus) {
        this.qtdTus = qtdTus;
    }

    public int getDia() {
        return dia;
    }

    public void setDia(int dia) {
        this.dia = dia;
    }

    public int getDepTC() {
        return depTC;
    }

    public void setDepTC(int depTC) {
        this.depTC = depTC;
    }

    public int getDepCalTC() {
        return depCalTC;
    }

    public void setDepCalTC(int depCalTC) {
        this.depCalTC = depCalTC;
    }

    public int getDepCalCappo() {
        return depCalCappo;
    }

    public void setDepCalCappo(int depCalCappo) {
        this.depCalCappo = depCalCappo;
    }

    public float getRisco() {
        return risco;
    }

    public void setRisco(float risco) {
        this.risco = risco;
    }

    public double getParc() {
        return parc;
    }

    public void setParc(double parc) {
        this.parc = parc;
    }

    public double getTxJuros() {
        return txJuros;
    }

    public void setTxJuros(double txJuros) {
        this.txJuros = txJuros;
    }

    public float getCustoPorTus() {
        return custoPorTus;
    }

    public void setCustoPorTus(float custoPorTus) {
        this.custoPorTus = custoPorTus;
    }

    public float getSimples() {
        return simples;
    }

    public void setSimples(float simples) {
        this.simples = simples;
    }

    

//métodos
    
    public void CalcHosp(){
        float h;
        h = getDia()*getCustHosp();
        hosp = h;
    }
    
    public void CalcCustoTus(){
    float c;
    c = (qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo))); 
    
        this.custTus = c;
        this.custoPorTus = (c + (custLog)+(hosp));
    }
    
    

    public void CalcPreco(){
        float p;
        p =  getCustTus() + Depreciacao.getDepPorTus();
        preco = p;
    }
    
        public void calcPgto() {
        double p = 0;  // coloqui zero para testar os blocos, caso houvesse fallha no fluxo o resultado seria zero.
        p=(qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo)
                + (custLog)+(dia*custHosp)));
        
        if ((int)parc > 1) {
            p = (((qtdTus*((provTC*risco)+((qtdTC*custCalTC)/depCalTC)+((qtdTC*custTC)/depTC)+(custCalFlu/depCalCappo)+(hMonDes*custMo)
                )+ (custLog)+(hosp))*(Math.pow((1+txJuros), (int)parc))));
            
        //System.out.printf("Custo Pgto R$%.2f %n", + p);
        custTotalPrazo = p;
        valorParcela = (p/(parc));
        } else {
           
        valor30ddl = (p);
        }
    }
        public void calcImp(){
        float i;
        i = (0.05f* getPreco()); //Simples
        simples = i;
    }

}
