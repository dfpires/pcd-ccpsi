import { prisma } from "./prisma";

export const TiposRepo = {
  list() {
    return prisma.tipoDeficiencia.findMany({ orderBy: { id: "asc" } });
  },
  listWithSubtipos() {
    return prisma.tipoDeficiencia.findMany({
      orderBy: { id: "asc" },
      include: { subtipos: { orderBy: { id: "asc" } } },
    });
  },
  create(nome: string) {
    return prisma.tipoDeficiencia.create({ data: { nome } });
  },
  findById(id: number) {
    return prisma.tipoDeficiencia.findUnique({ where: { id } });
  },
};