import type { Barreira, SubtipoDeficiencia, TipoComSubtipos, TipoDeficiencia } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let msg = text || res.statusText || "Erro na requisição";
    try {
      const j = JSON.parse(text);
      msg = j.error || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export const api = {

  listarTipos() { 
    return http<TipoDeficiencia[]>("/tipos");
  },
  criarTipo(nome: string) {
    return http<TipoDeficiencia>("/tipos", {
      method: "POST",
      body: JSON.stringify({ nome }),
    });
  },
  // novos:
  // GET /subtipos → seu backend retorna Tipos com seus subtipos
  listarTiposComSubtipos(): Promise<TipoComSubtipos[]> {
    return http("/tipos/com-subtipos");
  },
// POST /subtipos { nome, tipoId }
  criarSubtipo(nome: string, tipoId: number): Promise<SubtipoDeficiencia> {
    return http("/subtipos", {
      method: "POST",
      body: JSON.stringify({ nome, tipoId }),
    });
  },
  listarBarreiras(): Promise<Barreira[]> {
    return http("/barreiras");
  },
  criarBarreira(descricao: string): Promise<Barreira> {
    return http("/barreiras", {
      method: "POST",
      body: JSON.stringify({ descricao }),
    });
  },
  listarSubtipos(): Promise<SubtipoDeficiencia[]> {
    return http("/subtipos");
  },
  vincularBarreirasASubtipo(subtipoId: number, barreiraIds: number[]) {
    return http(`/vinculos/subtipos/${subtipoId}/barreiras`, {
      method: "POST",
      body: JSON.stringify({ barreiraIds }),
    });
  },

};
