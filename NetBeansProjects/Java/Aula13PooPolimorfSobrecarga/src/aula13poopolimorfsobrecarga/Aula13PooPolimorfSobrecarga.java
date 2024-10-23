package aula13poopolimorfsobrecarga;
/**
 *
 * @author Joel
 */
public class Aula13PooPolimorfSobrecarga {
    public static void main(String[] args) {
        //Programa Principal
        //Animal x = new Animal(); //Animal é classe abstrata, não pode ser instanciada
        Mamifero m = new Mamifero();
        Cachorro k = new Cachorro();
        Lobo l = new Lobo();
        
        
        //m.emitirSom();  //Polimorfismo
        //k.emitirSom();  //de
        //l.emitirSom();  //Sobreposição
        
        k.reagir("Olá");  //Polimorfismo
        k.reagir("Vai apanhar");      //de
        k.reagir(11,45);      //Sobrecarga
        k.reagir(21,00);
        k.reagir(true);
        k.reagir(false);
        k.reagir(2, 12.5f);
        k.reagir(17, 4.5f);
    }
    
}
