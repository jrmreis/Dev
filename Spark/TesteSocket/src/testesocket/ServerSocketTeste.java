/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package testesocket;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;

/**
 *
 * @author Joel
 */
public class ServerSocketTeste {

    /**
     * @param args the command line arguments
     * @throws java.io.IOException
     */
    public static void main(String[] args) throws IOException {

        ServerSocket server = new ServerSocket(9000);
        InetAddress inet = server.getInetAddress();
        
        
        //System.out.println("HostAddress=" + inet.getHostAddress());
        //System.out.println("HostName=" + inet.getHostName());
        System.out.println("Porta conectada = "+server.getLocalPort());
        System.out.println("Porta fechada? = "+server.isClosed());
        System.out.println("IP e Porta = "+server.toString());
        server.close();
        System.out.println("Porta fechada? = "+server.isClosed());
    }

}
