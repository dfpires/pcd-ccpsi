import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";

// já existentes
import TiposPage from "./pages/TiposPage";
import SubtiposPage from "./pages/SubtiposPage";
import BarreirasPage from "./pages/BarreirasPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona raiz para /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Área admin com layout e rotas filhas */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="tipos" element={<TiposPage />} />
          <Route path="subtipos" element={<SubtiposPage />} />
          <Route path="barreiras" element={<BarreirasPage />} />
        </Route>

        {/* 404 simples */}
        <Route path="*" element={<div className="container-page py-8">Página não encontrada.</div>} />
      </Routes>
    </BrowserRouter>
  );
}
