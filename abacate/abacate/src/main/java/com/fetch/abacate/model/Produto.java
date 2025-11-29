package com.fetch.abacate.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "produtos")
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;
    
    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 10, message = "Descrição deve ter no mínimo 10 caracteres")
    @Column(nullable = false)
    private String descricao;
    
    @Positive(message = "Preço deve ser maior que zero")
    @Column(nullable = false)
    private Double preco;
    
    @Positive(message = "Quantidade deve ser maior que zero")
    @Column(nullable = false)
    private Integer quantidade;
    
    @NotBlank(message = "Fabricante é obrigatório")
    @Column(nullable = false)
    private String fabricante;
    
    // Construtores
    public Produto() {
    }
    
    public Produto(String nome, String descricao, Double preco, Integer quantidade, String fabricante) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.fabricante = fabricante;
    }
    
    // getters e setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    public Double getPreco() {
        return preco;
    }
    
    public void setPreco(Double preco) {
        this.preco = preco;
    }
    
    public Integer getQuantidade() {
        return quantidade;
    }
    
    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
    
    public String getFabricante() {
        return fabricante;
    }
    
    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }
}
