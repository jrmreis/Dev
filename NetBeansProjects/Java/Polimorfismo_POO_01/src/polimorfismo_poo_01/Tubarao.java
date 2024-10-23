package polimorfismo_poo_01;

public class Tubarao extends Peixe{
    
    public Tubarao(){
        this.mar = true;
    }
    
    @Override
    public void alimentar(){
        System.out.println("Comendo carne");
    }
    
    public void cacando(){
        System.out.println("Predador caçando");
    }
}
