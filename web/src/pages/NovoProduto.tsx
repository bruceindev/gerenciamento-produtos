import { useState } from "react";
import { ProdutoAPI } from "../service/api.js";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const NovoProduto = () => {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    fabricante: "",
  });
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function atualizar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function salvar() {
    setErro("");

    ProdutoAPI.criar(form).then(async (res) => {
      if (!res.ok) {
        const data = await res.json();
        setErro(data.message || "Erro ao salvar.");
        return;
      }
      navigate("/");
    });
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Incluir novo produto</CardTitle>
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

          <Button onClick={salvar} className="w-full">
            Salvar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
