package polimorfismo_poo_01;

public class Mamifero extends Animal{

    protected String corPelo;
    protected boolean predador;

    public void cacando(){
        if (this.predador){
            System.out.println("Predador Caçando");
        } else {
            System.out.println("Esse animal não é predador");
        }
    }
    @Override
    public void locomover() {
        System.out.println("Correndo");
    }

    @Override
    public void alimentar() {
        if (predador){
            System.out.println("Comendo carne");
        } else {
            System.out.println("Comendo plantas");
        }
    }

    @Override
    public void emitirSom() {
        System.out.println("Som da espécie");
    }

    public String getCorPelo() {
        return corPelo;
    }

    public void setCorPelo(String corPelo) {
        this.corPelo = corPelo;
    }

    public String getPredador() {
        return (predador)?"Predador":"Caçado";
    }

    protected void setPredador(boolean predador) {
        this.predador = predador;
    }
}
