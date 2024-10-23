/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication6;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author Joel
 */
public class JavaApplication6 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws ParseException {

        //Getting the LocalDateTime object
        LocalDateTime localDateTime = LocalDateTime.now();
        System.out.println(localDateTime);
System.out.println("------------------------------------------");
        Calendar c = Calendar.getInstance();

        System.out.println("Data/Hora atual: " + c.getTime());
        System.out.println("Ano: " + c.get(Calendar.YEAR));
        System.out.println("Mês: " + c.get(Calendar.MONTH));
        System.out.println("Dia do Mês: " + c.get(Calendar.DAY_OF_MONTH));
        
  System.out.println("------------------------------------------");
  
  		//Calendar d = Calendar.getInstance();
		Date data = c.getTime();
		//DateFormat f = DateFormat.getDateInstance();

		//Date data2 = f.parse("12/01/1995");
		//System.out.println(data2);

		SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss dd/MM/yyyy");
		System.out.println("Data formatada: "+sdf.format(data));

		//Converte Objetos
		//System.out.println("Data convertida: "+sdf.parse("02/08/1970"));
        

    }

}
