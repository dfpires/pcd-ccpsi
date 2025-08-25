import { BarreirasRepo } from "../repositories/barreiras.repo";

export const BarreirasService = {
  list() {
    return BarreirasRepo.list();
  },
  async create(descricao: string) {
    const final = (descricao ?? "").trim();
    if (!final) throw Object.assign(new Error("O campo 'descricao' é obrigatório"), { status: 400 });
    return BarreirasRepo.create(final);
  },
};