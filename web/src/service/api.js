const API_URL = "http://localhost:8080";

export const ProdutoAPI = {
  listar: () => fetch(`${API_URL}/produtos`).then(res => res.json()),

  buscar: (id) => fetch(`${API_URL}/produtos/${id}`).then(res => res.json()),

  criar: (dados) =>
    fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    }),

  atualizar: (id, dados) =>
    fetch(`${API_URL}/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    }),

  excluir: (id) =>
    fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE"
    })
};
