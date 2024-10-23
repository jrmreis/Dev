package polimorfismo_poo_01;

public class Largatixa extends Reptil{
    
    public void subirParede(){
        System.out.println("Subindo pelas paredes");
    }
    
    @Override
    public void alimentar(){
        System.out.println("Comendo insetos");
    }
    
    public void desacoplarCalda(){
        System.out.println("Desacoplamento da calda efetuado! Fui...");
    }
}
