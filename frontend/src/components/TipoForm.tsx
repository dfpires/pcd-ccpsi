import { useState } from "react";
import { api } from "../lib/api";
type Props = {
  onCreated: () => void; // para recarregar a lista ao criar
};
export default function TipoForm({ onCreated }: Props) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    const trimmed = nome.trim();
    if (!trimmed) {
      setErro("Informe um nome.");
      return;
    }
    setLoading(true);
    try {
      await api.criarTipo(trimmed);
      setNome("");
      onCreated();
    } catch (err: any) {
      setErro(err?.message ?? "Erro ao criar tipo");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <div>
        <label className="label">Nome do tipo</label>
        <input
          className="input"
          placeholder="ex.: Deficiência Cognitiva"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
        />
        {erro && <p className="error">{erro}</p>}
      </div>
      <div className="flex justify-end">
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Salvando..." : "Criar tipo"}
        </button>
      </div>
    </form>
  );
}
