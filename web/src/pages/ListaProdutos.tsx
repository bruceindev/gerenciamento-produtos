import { useEffect, useState } from "react";
import { ProdutoAPI } from "../service/api.js";
import { useNavigate } from "react-router-dom";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";
import { Button } from "@/components/ui/button.js";
import { Badge } from "@/components/ui/badge.js";

export const ListaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    ProdutoAPI.listar().then(setProdutos);
  }

  function abrirModal(id: number) {
    setIdExcluir(id);
    setModalOpen(true);
  }

  function excluirProduto() {
    ProdutoAPI.excluir(idExcluir).then(() => {
      setMensagem("Produto excluído com sucesso!");
      setModalOpen(false);
      carregar();
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Gerenciamento de Produtos</h1>

      {mensagem && (
        <p className="text-green-600 text-sm bg-green-100 border border-green-300 p-2 rounded">
          {mensagem}
        </p>
      )}

      <Button onClick={() => navigate("/novo")}>Incluir novo produto</Button>

      <div className="space-y-4">
        {produtos.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhum produto cadastrado.</p>
        )}

        {produtos.map((p) => (
          <Card key={p.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {p.nome}

                {p.quantidade <= 3 && (
                  <Badge variant="destructive" className="text-xs">
                    Estoque baixo
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1 text-sm text-gray-700">
              <p><strong>Fabricante:</strong> {p.fabricante}</p>
              <p><strong>Preço:</strong> R$ {p.preco}</p>
              <p><strong>Quantidade:</strong> {p.quantidade}</p>
              <p className="text-gray-600">{p.descricao}</p>

              <div className="flex gap-2 pt-3">
                <Button size="sm" onClick={() => navigate(`/editar/${p.id}`)}>
                  Alterar
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => abrirModal(p.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Confirmação */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja excluir o produto {idExcluir}?</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>

            <Button variant="destructive" onClick={excluirProduto}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
