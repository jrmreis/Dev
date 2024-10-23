package projetoyoutube;
/**
 *
 * @author Joel
 */
public class Video implements AcoesVideo{
    //Atributos
    private String titulo;
    private int avaliacao;
    private int view;
    private int curtidas;
    private boolean reproduzindo;
    //Método Construtor

    public Video(String titulo) {
        this.titulo = titulo;
        this.avaliacao = 1;
        this.view = 0;
        this.curtidas = 0;
        this.reproduzindo = false;
    }
    


    //Métodos Abstratos

    @Override
    public void play() {
        this.reproduzindo=true;
    }

    @Override
    public void pause() {
        this.reproduzindo=!true;
    }

    @Override
    public void like() {
        this.curtidas ++;
    }
    //inserir Código to String

    @Override
    public String toString() {
        return "Video{" + "titulo=" + titulo + ", avaliacao=" + avaliacao + 
                ", view=" + view + ", curtidas=" + curtidas + 
                ", reproduzindo=" + reproduzindo + '}';
    }
    
    

    //getters e setters

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public int getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(int avaliacao) {
        int nova;
        nova = (int) ((this.avaliacao + avaliacao)/this.view);
        this.avaliacao = nova;
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    public int getCurtidas() {
        return curtidas;
    }

    public void setCurtidas(int curtidas) {
        this.curtidas = curtidas;
    }

    public boolean isReproduzindo() {
        return reproduzindo;
    }

    public void setReproduzindo(boolean reproduzindo) {
        this.reproduzindo = reproduzindo;
    }
    
    
    
    
}
