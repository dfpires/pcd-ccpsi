import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { TipoComSubtipos } from "../types";
import SubtipoList from "../components/SubtipoList";
import SubtipoForm from "../components/SubtipoForm";

export default function SubtiposPage() {
  const [tipos, setTipos] = useState<TipoComSubtipos[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarTiposComSubtipos();
      setTipos(data);
    } catch (e: any) {
      setErro(e.message ?? "Erro ao carregar subtipos");
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
        <h1 className="text-2xl font-bold">Subtipos de Deficiência</h1>
        <p className="text-gray-600">Crie subtipos e consulte por tipo.</p>
      </header>

      <SubtipoForm pedro={carregar}/>
      {
      loading ? (
        <div className="card">Carregando...</div>
      ) : erro ? (
        <div className="card text-red-600">{erro}</div>
      ) : (
        <SubtipoList tipos={tipos} />
      )
      }
    </div>
  );
}
