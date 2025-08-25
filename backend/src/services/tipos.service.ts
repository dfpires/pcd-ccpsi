import { TiposRepo } from "../repositories/tipos.repo";

export const TiposService = {
  list() {
    return TiposRepo.list();
  },
  listWithSubtipos() {
    return TiposRepo.listWithSubtipos();
  },
  async create(nome: string) {
    const final = (nome ?? "").trim();
    if (!final) throw Object.assign(new Error("O campo 'nome' é obrigatório"), { status: 400 });
    return TiposRepo.create(final);
  },
};