/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src;

import java.io.IOException;
import java.net.Socket;

/**
 *
 * @author Joel
 */
public class ConSpark {
    //atributos
    String ip = "13.68.0.94";
    int porta = 9000;
    long tEsp = 3000; //ms
    long tempo;
    
    
    //método interno
    public void con() throws IOException{
        
                
        long start = System.currentTimeMillis();
        Socket socket = new Socket(ip, porta);
        
        
        
        
        socket.close();
        long end = System.currentTimeMillis();
        
        //tempo = (String.valueOf(end - start)); 
        tempo = ((end - start)); 
        
        
    }
//método construtor
    public ConSpark() {
    }
//métodos getters e setters
//    public String getTempo() {
//        return tempo;
//    }
//
//    public void setTempo(String tempo) {
//        this.tempo = tempo;
//    }
//métodos getters e setters
    public long getTempo() {
        return tempo;
    }

    public void setTempo(long tempo) {
        this.tempo = tempo;
    }
    
    
    
}
