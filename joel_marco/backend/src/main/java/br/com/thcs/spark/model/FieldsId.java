package br.com.thcs.spark.model;

import java.io.Serializable;

public class FieldsId implements Serializable {
    private String type;
    private String flow;
    private String name;
    public FieldsId() {};
    public FieldsId (String type, String flow, String name) {
        this.type = type;
        this.flow = flow;
        this.name = name;
    }
}
