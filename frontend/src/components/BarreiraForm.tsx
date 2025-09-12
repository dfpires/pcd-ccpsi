import { useState } from "react";
import { api } from "../lib/api";
type Props = { onCreated: () => void };

export default function BarreiraForm({ onCreated }: Props) {
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!descricao.trim()) {
      setErro("Informe uma descrição.");
      return;
    }
    setLoading(true);
    try {
      await api.criarBarreira(descricao.trim());
      setDescricao("");
      onCreated(); // carregar()
    } catch (e: any) {
      setErro(e.message ?? "Erro ao criar barreira");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <div>
        <label className="label">Descrição da barreira</label>
        <input
          className="input"
          placeholder="ex.: Escadas"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          disabled={loading}
        />
        {erro && <p className="error">{erro}</p>}
      </div>
      <div className="flex justify-end">
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Salvando..." : "Criar barreira"}
        </button>
      </div>
    </form>
  );
}
