package polimorfismo_poo_01;

public class Cachorro extends Mamifero{
    
    public Cachorro(){
        this.predador = true;
    }
    
    public void enterrarOsso(){
        System.out.println("Enterrando o osso");
    }
    
    public void abanarRabo(){
        System.out.println("Abanando o rabo");
    }
    
    @Override
    public void emitirSom(){
        System.out.println("Au! Au! Au!");
    }
}
