/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package checarcpfcnpj;

/**
 *
 * @author Joel
 */
public class ChecarCpfCnpj {

    /**
     * @param args the command line arguments
     */
    
    public static void main(String[] args) {
        // TODO code application logic here
        GeraCpfCnpj c = new GeraCpfCnpj();
        
        boolean cpf = c.isCPF("28689832866");
        boolean cnpj = c.isCNPJ("62.022.017/0001-05");
        
        
        System.out.println("O CPF é " + cpf);
        System.out.println("O CNPJ é " + cnpj);
        
        
    }
    
}
