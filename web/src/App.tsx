import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListaProdutos } from "./pages/ListaProdutos";
import { NovoProduto } from "./pages/NovoProduto";
import { EditarProduto } from "./pages/EditarProduto";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaProdutos />} />
        <Route path="/novo" element={<NovoProduto />} />
        <Route path="/editar/:id" element={<EditarProduto />} />
      </Routes>
    </BrowserRouter>
  );
}
