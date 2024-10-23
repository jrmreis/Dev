package polimorfismo_poo_01;

public class Ave extends Animal{
    protected String corPena;
    protected boolean canora;
    
    public void fazerninho(){
        System.out.println("Fazendo um ninho...");
    }
    
    @Override
    public void locomover() {
        System.out.println("Voando");
    }

    @Override
    public void alimentar() {
        System.out.println("Comendo sementes");
    }

    @Override
    public void emitirSom() {
        if (this.canora){
            System.out.println("Cantando");
        } else {
            System.out.println("Piando");
        }
    }

    public String getCorPena() {
        return corPena;
    }

    public void setCorPena(String corPena) {
        this.corPena = corPena;
    }

    public boolean getCanora() {
        return canora;
    }

    public void setCanora(boolean canora) {
        this.canora = canora;
    }
    
    
}
