package polimorfismo_poo_01;

public class Peixe extends Animal{

    protected String corEscama;
    protected boolean mar;
    
    public void soltarBolha(){
        System.out.println("Soltou uma bolha");
    }
    
    @Override
    public void locomover() {
        System.out.println("Nadando");
    }

    @Override
    public void alimentar() {
        System.out.println("Comendo máteria");
    }

    @Override
    public void emitirSom() {
        System.out.println("Não emite sons");
    }

    public String getCorEscama() {
        return corEscama;
    }

    public void setCorEscama(String corEscama) {
        this.corEscama = corEscama;
    }

    public String getMar() {
        return (mar)?"Água salgada":"Água doce";
    }

    public void setMar(boolean mar) {
        this.mar = mar;
    }
    
    
}
