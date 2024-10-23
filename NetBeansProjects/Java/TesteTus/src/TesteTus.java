

import java.util.Scanner;



/**
 *
 * @author Joel
 */
public class TesteTus {

    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);
        
        System.out.print("Digite quantos dias: ");
        int d = teclado.nextInt();
        
        System.out.print("Digite quantos Fornos: ");
        int f = teclado.nextInt();
        
        System.out.print("Digite quantas parcelas: ");
        int p = teclado.nextInt();
        
        System.out.print("Digite valor dollar hj: ");
        int vDH = teclado.nextInt();
        
        
        CustoTus m = new CustoTus(f,d,p);
        m.calcular();
        m.calcLog();
        m.calcPgto();
        m.calcImp();
        m.calcHosp();
        
        DespesasTus x = new DespesasTus(f,d,p,vDH);
        x.calcDep(vDH);
        
        
        
        
        
        
        
    }


    
}
