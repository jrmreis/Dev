package polimorfismo_poo_01;

public class Cobra extends Reptil{
    
    public Cobra(){
        this.venenoso = true;
    }
    
    @Override
    public void emitirSom() {
        System.out.println("Agitando o guizo");
    }    
}
