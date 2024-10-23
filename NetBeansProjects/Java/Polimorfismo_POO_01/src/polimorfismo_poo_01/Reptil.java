package polimorfismo_poo_01;

public class Reptil extends Animal{
    protected String corEscama;
    protected boolean venenoso;
    
    public void usarVeneno(){
        if (venenoso) {
            System.out.println("Usando o veneno");
        } else {
            System.out.println("Não é venenoso");
        }
    }
    
    @Override
    public void locomover() {
        System.out.println("Rastejando");
    }

    @Override
    public void alimentar() {
        System.out.println("Comendo um ovo");
    }

    @Override
    public void emitirSom() {
        System.out.println("Chiando");
    }

    
}
