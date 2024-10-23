package aulapoo09;
/**
 *
 * @author Joel
 */
public class AulaPoo09 {
    public static void main(String[] args) {
        Pessoa[] p = new Pessoa[2];
        Livro[] l = new Livro[3];
        
        p[0] = new Pessoa("Pedro", 22, "M");
        p[1] = new Pessoa("Creuza", 24, "F");
        
        l[0] = new Livro("Aprendendo Java", "Camões", 300, p[0]);
        l[1] = new Livro("Poo Básico", "Pedro Albuquerque", 800, p[1]);
        l[2] = new Livro("Branca de Neve", "Alice M. M.", 273, p[1]);
        
        l[0].abrir();
        //l[2].folhear(1);
        //l[2].avancarPag();
        l[0].voltarPag();
        
        System.out.println(l[0].detalhes());
        
        
    }
    
}
