/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 *
 * @author Joel
 */
public class HoraDoSistema {

    /**
     * @param args the command line arguments
     * @return 
     */
    //public static String main(String[] args) {
        // TODO code application logic here
        


        String getDateTime() {
	DateFormat dF = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	Date r = new Date();
	return dF.format(r);
        
    }
    
}
