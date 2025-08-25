import { prisma } from "./prisma";

export const BarreirasRepo = {
  list() {
    return prisma.barreira.findMany({ orderBy: { id: "asc" } });
  },
  create(descricao: string) {
    return prisma.barreira.create({ data: { descricao } });
  },
  findById(id: number) {
    return prisma.barreira.findUnique({ where: { id } });
  },
  // opcional: listar acessibilidades já diretamente pela barreira
  listAcessibilidades(id: number) {
    return prisma.barreira.findUnique({
      where: { id },
      include: {
        acessibilidades: {
          include: { acessibilidade: true },
          orderBy: { acessibilidadeId: "asc" },
        },
      },
    });
  },
};