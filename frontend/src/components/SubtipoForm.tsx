import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { TipoDeficiencia } from "../types";

type Props = { pedro: () => void };

export default function SubtipoForm({ pedro }: Props) {
  const [tipos, setTipos] = useState<TipoDeficiencia[]>([]);
  const [tipoId, setTipoId] = useState<number | "">("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.listarTipos()
      .then(setTipos)
      .catch((e) => setErro(e.message));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // não recarrega a página
    setErro(null);

    const trimmed = nome.trim();
    if (!trimmed || !tipoId) {
      setErro("Escolha um tipo e informe o nome do subtipo.");
      return;
    }

    setLoading(true);
    try {
      await api.criarSubtipo(trimmed, Number(tipoId));
      setNome("");
      setTipoId("");
      pedro(); // chama a função do pai - carregar()
    } catch (e: any) {
      setErro(e.message ?? "Erro ao criar subtipo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Tipo</label>
          <select
            className="input"
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value ? Number(e.target.value) : "")}
            disabled={loading || !tipos.length}
          >
            <option value="">Selecione um tipo...</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Nome do subtipo</label>
          <input
            className="input"
            placeholder="ex.: Baixa visão"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      {erro && <p className="error">{erro}</p>}

      <div className="flex justify-end">
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Salvando..." : "Criar subtipo"}
        </button>
      </div>
    </form>
  );
}
