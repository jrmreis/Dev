/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calculo.custos.canoas;

/**
 *
 * @author Joel
 */
public class Tus {
    //Atributos (variáveis de objeto)
    public int qtdTus;
    public float custCalibTermopares;
    public float custUnTermopar;
    public int prazoCalibTermopares;
    public float custCalibFluke;
    public int prazoCalibFluke;
    public float ProvisaoQuebTermopar;

 


    //Métodos (ações)
    public float provisaoQuebTermopar(){
        this.setProvisaoQuebTermopar(custUnTermopar);
        return this.ProvisaoQuebTermopar;
        
    }
    public void CustoTotalTus(){
        this.setCustoTotalTus(custCalibTermopares*9+custCalibFluke);
       // + provisaoQuebTermopar(float pQT));
    }
    public void PrazoCalibTotal(){
        this.setPrazoCalibTotal(prazoCalibFluke+prazoCalibTermopares);
    }

    
//Métodos Especiais

    public Tus() {

     //CustoTusFornos A1 = new CustoTusFornos();
     
    }

    public int getQtdTus() {
        return qtdTus;
    }

    public void setQtdTus(int qtdTus) {
        this.qtdTus = qtdTus;
    }

    public float getCustCalibTermopares() {
        return custCalibTermopares;
    }

    public void setCustCalibTermopares(float custCalibTermopares) {
        this.custCalibTermopares = custCalibTermopares;
    }

    public float getCustUnTermopar() {
        return custUnTermopar;
    }

    public void setCustUnTermopar(float custUnTermopar) {
        this.custUnTermopar = custUnTermopar;
    }

    public int getPrazoCalibTermopares() {
        return prazoCalibTermopares;
    }

    public void setPrazoCalibTermopares(int prazoCalibTermopares) {
        this.prazoCalibTermopares = prazoCalibTermopares;
    }

    public float getCustCalibFluke() {
        return custCalibFluke;
    }

    public void setCustCalibFluke(float custCalibFluke) {
        this.custCalibFluke = custCalibFluke;
    }

    public int getPrazoCalibFluke() {
        return prazoCalibFluke;
    }

    public void setPrazoCalibFluke(int prazoCalibFluke) {
        this.prazoCalibFluke = prazoCalibFluke;
    }



 

    private void setCustoTotalTus(float f) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private void setPrazoCalibTotal(int i) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    private void setProvisaoQuebTermopar(float f) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    


     
    
    
    
}
