package conec;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Joel
 */
public class con35 {

    /**
     * @param args the command line arguments
     */
    private static final String DRIVER = "oracle.jdbc.driver";
    private static final String URL = "jdbc:oracle:thin:@13.68.0.35:1521:INFO";
    private static final String USER = "JOEL";
    private static final String PASS = "joel";
    
    public static Connection getConnection(){
        try{
        Class.forName(DRIVER);
        return DriverManager.getConnection(URL, USER, PASS);
        
    }catch (ClassNotFoundException | SQLException ex){
        throw new RuntimeException("Erro na conexão", ex);
    }

    }
    
    public static void closeConnection(Connection con){
        if (con != null){            
            try {
                con.close();
            } catch (SQLException ex) {
                System.err.println("Erro!"+ex);
            }          
        }
    }
    public static void closeConnection(Connection con, PreparedStatement stmt){
        if (stmt != null){            
            try {
                stmt.close();
            } catch (SQLException ex) {
                System.err.println("Erro!"+ex);
            }          
        }
        closeConnection(con);
    }
    public static void closeConnection(Connection con, PreparedStatement stmt, ResultSet rs){
        if (rs != null){            
            try {
                rs.close();
            } catch (SQLException ex) {
                System.err.println("Erro!"+ex);
            }          
        }
        closeConnection(con, stmt);
    }
    
    
    
}
    

