/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;

/**
 *
 * @author Joel
 */

   
    public class Cliente {

    ArrayList<Integer> armazenar = new ArrayList<>();

    public static void main(String[] args)
            throws IOException {
        Socket cliente = new Socket("127.0.0.1", 8080);
        System.out.println("O cliente se conectou ao servidor!");
        Cliente c = new Cliente();


        // LER ARQUIVO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        System.out.printf("Lendo arquivo impar.txt\n");
        String nome = "/home/teste/impar.txt";

        System.out.printf("\nConteúdo do arquivo de texto:");
        try {
            FileReader arq = new FileReader(nome);
            BufferedReader lerArq = new BufferedReader(arq);
            String linha = "";


            // a variável "linha" recebe o valor "null" quando o processo
            // de repetição atingir o final do arquivo texto
            while (linha != null) {
                System.out.printf("%s\n", linha);
                linha = lerArq.readLine(); // lê da primeira até a última linha

                try {
                    c.armazenar.add(Integer.parseInt(linha));

                } catch (NumberFormatException e) {
                    e.getMessage();
                }
            }

            String armazenarString = c.armazenar.toString();
            System.out.println("\nSalvando valores do arquivo impar.txt na variavel armazenarString: " + armazenarString);

            System.out.println("Enviando os dados para o servidor!");
            
DataOutputStream dos = new DataOutputStream(cliente.getOutputStream());
dos.writeUTF("A mensagem!"); //Coloque sua variável string aqui dentro.
dos.flush(); // Manda tudo por água abaixo.
dos.close();

            arq.close();
            cliente.close();
        } catch (IOException e) {
            e.getMessage();
        }
    }
}
    
    
    
    

