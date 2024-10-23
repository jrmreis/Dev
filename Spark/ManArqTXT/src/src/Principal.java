/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src;

import java.io.IOException;

/**
 *
 * @author Joel
 */
public class Principal {

    /**
     * @param args the command line arguments
     */
    	public static void main(String args[]) throws IOException {
		String path = "C:\\Users\\Joel\\Documents\\ArqTextTeste\\teste.txt";

		ManipuladorArquivo.escritor(path);
		ManipuladorArquivo.leitor(path);
	}

}