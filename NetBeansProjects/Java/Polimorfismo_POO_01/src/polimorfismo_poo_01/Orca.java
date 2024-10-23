package polimorfismo_poo_01;

public class Orca extends Mamifero{
    
    public Orca(){
        this.predador = true;
    }
    
    @Override
    public void locomover(){
        System.out.println("Nadando");
    }
    
    public void esguichar(){
        System.out.println("Esguichando água");
    }
}
