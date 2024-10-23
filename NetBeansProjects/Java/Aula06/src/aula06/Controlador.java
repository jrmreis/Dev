
package aula06;
/**
 *
 * @author Joel
 */
public interface Controlador {
    //Métodos Abstratos (pois é uma interface)
    public abstract void ligar();
    public abstract void desligar();
    public abstract void abrirMenu();
    public abstract void fecharMenu();
    public abstract void maisVolume();
    public abstract void menosVolume();
    public abstract void ligarMudo();
    public abstract void desligarMudo();
    public abstract void play();
    public abstract void pause();
    
    
}
