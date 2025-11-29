package com.fetch.abacate.exception;

public class ProdutoNaoEncontradoException extends RuntimeException {
    
    public ProdutoNaoEncontradoException(String message) {
        super(message);
    }
    
    public ProdutoNaoEncontradoException(Long id) {
        super("Produto não encontrado com o ID: " + id);
    }
    
    public ProdutoNaoEncontradoException(String message, Throwable cause) {
        super(message, cause);
    }
}
