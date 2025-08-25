import { prisma } from "./prisma";

export const AcessRepo = {
  list() {
    return prisma.acessibilidade.findMany({ orderBy: { id: "asc" } });
  },
  create(descricao: string) {
    return prisma.acessibilidade.create({ data: { descricao } });
  },
  findById(id: number) {
    return prisma.acessibilidade.findUnique({ where: { id } });
  },
};