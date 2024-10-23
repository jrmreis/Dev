package polimorfismo_poo_01;

public class Pinguim extends Ave{
    
    @Override
    public void locomover(){
        System.out.println("Caminhando");
    }
    
    @Override
    public void alimentar(){
        System.out.println("Comendo peixe");
    }
}
