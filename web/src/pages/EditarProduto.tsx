import { useState, useEffect } from "react";
import { ProdutoAPI } from "../service/api.js";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export const EditarProduto = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    fabricante: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      ProdutoAPI.buscar(id).then((produto: any) => {
        setForm({
          nome: produto.nome || "",
          descricao: produto.descricao || "",
          preco: produto.preco || "",
          quantidade: produto.quantidade || "",
          fabricante: produto.fabricante || "",
        });
        setCarregando(false);
      }).catch(() => {
        setErro("Erro ao carregar produto.");
        setCarregando(false);
      });
    }
  }, [id]);

  function atualizar(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function salvar() {
    setModalOpen(true);
  }

  function confirmarSalvar() {
    setErro("");

    ProdutoAPI.atualizar(id, form).then(async (res: Response) => {
      if (!res.ok) {
        const data = await res.json();
        setErro(data.message || "Erro ao salvar.");
        setModalOpen(false);
        return;
      }
      setModalOpen(false);
      navigate("/");
    }).catch(() => {
      setErro("Erro ao salvar alterações.");
      setModalOpen(false);
    });
  }

  if (carregando) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editar produto</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <Input
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={atualizar}
          />

          <Textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={atualizar}
          />

          <Input
            name="preco"
            type="number"
            placeholder="Preço"
            value={form.preco}
            onChange={atualizar}
          />

          <Input
            name="quantidade"
            type="number"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={atualizar}
          />

          <Input
            name="fabricante"
            placeholder="Fabricante"
            value={form.fabricante}
            onChange={atualizar}
          />

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={salvar} className="flex-1">
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Confirmação */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja salvar as alterações no produto?</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>

            <Button onClick={confirmarSalvar}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};