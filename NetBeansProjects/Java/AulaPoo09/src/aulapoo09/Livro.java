package aulapoo09;
/**
 *
 * @author Joel
 */
public class Livro implements Publicacao {
    //Atributos
    private String titulo;
    private String autor;
    private int totPaginas;
    private int pagAtual;
    private boolean aberto;
    private Pessoa leitor; //agregação
//Métodos Especiais
//Construtor

    public Livro(String titulo, String autor, int totPaginas, Pessoa leitor) {
        this.titulo = titulo;
        this.autor = autor;
        this.totPaginas = totPaginas;
        this.leitor = leitor;
    }

 //getters e setters

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public int getTotPaginas() {
        return totPaginas;
    }

    public void setTotPaginas(int totPaginas) {
        this.totPaginas = totPaginas;
    }

    public int getPagAtual() {
        return pagAtual;
    }

    public void setPagAtual(int pagAtual) {
        this.pagAtual = pagAtual;
    }

    public boolean isAberto() {
        return aberto;
    }

    public void setAberto(boolean aberto) {
        this.aberto = aberto;
    }

    public Pessoa getLeitor() {
        return leitor;
    }

    public void setLeitor(Pessoa leitor) {
        this.leitor = leitor;
    }
    


//Métodos Personalizados (inserir codigo, to String, renomear para detalhes, e apager override.
    public String detalhes() {
        return ("Livro " + "titulo = " + titulo + ", autor = " + autor +               // \n quebra linha
                ", totPaginas = " + totPaginas + ", pagAtual = " + pagAtual +          // modificar de para leitor.getIdade
                ", aberto = " + aberto + ", leitor = " + leitor.getNome()) +
                ", idade = " + leitor.getIdade() + ", sexo = " + leitor.getSexo();          // leitor.getNome e leitor.getSexo
    }

//Implementação de todos os Métodos Abstratos da Interface
    @Override
    public void abrir() {
        this.aberto = true;
    }

    @Override
    public void fechar() {
        this.aberto = false;
    }

    @Override
    public void folhear(int p) { //mesma assinatura da interface
        if (p<this.totPaginas){
        this.pagAtual = p;
        }else {
            this.pagAtual=totPaginas;
                
                }
    }

    @Override
    public void avancarPag() {
        if (this.pagAtual<this.totPaginas){
        this.pagAtual++; 
        }else {
            this.pagAtual=totPaginas;
        }       
    }

    @Override
    public void voltarPag() {
        if (this.pagAtual>0){
        this.pagAtual--;   
        }else{
            this.pagAtual=0;
        }
        
    }
    
    
}
