import { AcessRepo } from "../repositories/acessibilidades.repo";

export const AcessService = {
  list() {
    return AcessRepo.list();
  },
  async create(descricao: string) {
    const final = (descricao ?? "").trim();
    if (!final) throw Object.assign(new Error("O campo 'descricao' é obrigatório"), { status: 400 });
    return AcessRepo.create(final);
  },
};