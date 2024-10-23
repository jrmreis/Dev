/**
 *
 * @author Joel
 */
public class Somar {
    //Atributos
    private float v1 = 0;
    private float v2 = 0;
    public float r = 0;
    
    //Método Construtor

    public Somar(float v1, float v2) {
        this.v1 = v1;
        this.v2 = v2;
        this.r = 0;
    }
        
    //Metodo interno

    public void calc(){
        this.r = (v1 + v2);
    
    }    
        
    //getters e setters

    public float getV1() {
        return v1;
    }

    public void setV1(float v1) {
        this.v1 = v1;
    }

    public float getV2() {
        return v2;
    }

    public void setV2(float v2) {
        this.v2 = v2;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }
    
    
    
}
