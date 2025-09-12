import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { Barreira } from "../types";
import BarreiraForm from "../components/BarreiraForm";
import VincularBarreiraForm from "../components/VincularBarreiraForm";

export default function BarreirasPage() {
  const [barreiras, setBarreiras] = useState<Barreira[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregar() {
    setErro(null);
    setLoading(true);
    try {
      const data = await api.listarBarreiras();
      setBarreiras(data);
    } catch (e: any) {
      setErro(e.message ?? "Erro ao carregar barreiras");
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
        <h1 className="text-2xl font-bold">Barreiras</h1>
        <p className="text-gray-600">
          Crie novas barreiras e vincule a subtipos de deficiência.
        </p>
      </header>

      <BarreiraForm onCreated={carregar} />
      <VincularBarreiraForm onLinked={carregar} />

      {loading ? (
        <div className="card">Carregando...</div>
      ) : erro ? (
        <div className="card text-red-600">{erro}</div>
      ) : (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Barreiras cadastradas</h3>
          <ul className="divide-y">
            {barreiras.map((b) => (
              <li key={b.id} className="py-2 flex justify-between">
                <span>{b.descricao}</span>
                <span className="text-xs text-gray-400">#{b.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
