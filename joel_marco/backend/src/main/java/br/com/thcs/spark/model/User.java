//package br.com.thcs.spark.model;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.Id;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Entity(name="SPK_USUARIOS")
//public class User {
//    @javax.persistence.Id
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name="USERNAME", columnDefinition = "char(50)")
//    private String username;
//
//    @Column(name="PASSWORD", columnDefinition = "char(50)")
//    private String password;
//
//    @Column(name="ROLE", columnDefinition = "char(50)")
//    private String role;
//}