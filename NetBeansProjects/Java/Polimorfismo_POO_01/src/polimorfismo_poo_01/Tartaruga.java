package polimorfismo_poo_01;

public class Tartaruga extends Reptil{
    
    @Override
    public void locomover(){
        System.out.println("Andannndo beeeem devagaaaaar");
    }
    
    @Override
    public void alimentar(){
        System.out.println("Comendo folhas");
    }
    
    public void esconder(){
        System.out.println("Escondendo no interior do casco");
    }

    public String getCorEscama() {
        return corEscama;
    }

    public void setCorEscama(String corEscama) {
        this.corEscama = corEscama;
    }

    public boolean isVenenoso() {
        return venenoso;
    }

    public void setVenenoso(boolean venenoso) {
        this.venenoso = venenoso;
    }
    
}
