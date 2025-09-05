import { useEffect, useState } from "react";
import TipoForm from "../components/TipoForm";
import TipoList from "../components/TipoList";
import { api } from "../lib/api";
import type { TipoDeficiencia } from "../types";

export default function TiposPage() {
  const [tipos, setTipos] = useState<TipoDeficiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarTipos();
      setTipos(data);
    } catch (err: any) {
      setErro(err?.message ?? "Erro ao carregar tipos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
   <div className="container-page space-y-6 py-8">
            <header>
                <h1 className="text-2xl font-bold">Tipos de Deficiência</h1>
                <p className="text-gray-600">Crie e consulte os tipos cadastrados na API.</p>
            </header>

        <TipoForm onCreated={carregar} />

      {loading ? (
        <div className="card">Carregando...</div>
      ) : erro ? (
        <div className="card text-red-600">{erro}</div>
      ) : (
        <TipoList tipos={tipos} />
      )}
        </div>
  );
}
