/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src;

/*
import java.io.ObjectInputStream;
import java.net.Socket;
import java.sql.Date;
import javax.swing.JOptionPane;
*/

import java.net.*;
//import java.util.*;
import java.io.*;
import java.util.logging.Logger;
//import view.Painel;





public class Ping{

    
    
    public static void main(String args[])
     throws Exception
    {
        long total = 0;
     for (int n = 0; n <= 2; n++) {
         long start = System.currentTimeMillis();
         try {
          Socket socket = new Socket("13.68.0.94", 9000);
          socket.close();
          
         } catch (IOException e) {
          System.out.println(e);
          
         
         }
         long end = System.currentTimeMillis();
         total = (end - start);
         System.out.println("time " + (total) + " ms");
                  
                
         }
        //return String.valueOf(total);
     
     }

/*
      private static final Logger LOG = Logger.getLogger(Ping.class.getName());
    
       
        public String getTempo() {
        return total;
        }
    public void setTempo(long t) {
        this.t = tempo;
    }
    
    public long setTempo (long t){
        
        t = total;
    }
      public static String mTempo (){
          
         String t;
         t = ( "olá" + (String.valueOf(total)));
         return t;
    }  
    */

    

    
   
     
}
         
         
    

    


    


















/*

import java.io.*;   
import java.net.*;



public class Conexao {

    public static void main(String[] args) throws IOException {
      try{        
            Socket cliente = new Socket("13.68.0.42", 9000);

DataInputStream din=new DataInputStream(cliente.getInputStream());  
DataOutputStream dout=new DataOutputStream(cliente.getOutputStream());  
BufferedReader br=new BufferedReader(new InputStreamReader(System.in));  
  
String str="",str2="";  
while(!str.equals("stop")){  
str=br.readLine();  
dout.writeUTF(str);  
dout.flush();  
str2=din.readUTF();  
System.out.println("Server says: "+str2);  
}  
  
dout.close();  
cliente.close(); 

}catch(Exception e){System.out.println(e);}  

} }
      
      
*/      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
 /*     try (ObjectInputStream entrada = new ObjectInputStream(cliente.getInputStream())) {
            Date data_atual = (Date)entrada.readObject();
            JOptionPane.showMessageDialog(null,"Data recebida do servidor:" + data_atual.toString());
        }
      System.out.println("Conexão encerrada");
    }
    catch(Exception e) {
      System.out.println("Erro: " + e.getMessage());
    }
  }
}
*/
