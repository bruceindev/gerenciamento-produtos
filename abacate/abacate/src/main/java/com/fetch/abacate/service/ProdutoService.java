package com.fetch.abacate.service;

import com.fetch.abacate.exception.ProdutoNaoEncontradoException;
import com.fetch.abacate.model.Produto;
import com.fetch.abacate.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }
    
    // buscar produto por ID
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(id));
    }
    
    // criar novo produto
    public Produto criar(Produto produto) {
        return produtoRepository.save(produto);
    }
    
    // atualizar produto existente
    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produtoExistente = produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(id));
        
        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setQuantidade(produtoAtualizado.getQuantidade());
        produtoExistente.setFabricante(produtoAtualizado.getFabricante());
        
        return produtoRepository.save(produtoExistente);
    }
    
    // excluir produto
    public void excluir(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ProdutoNaoEncontradoException(id));
        
        produtoRepository.delete(produto);
    }
}
