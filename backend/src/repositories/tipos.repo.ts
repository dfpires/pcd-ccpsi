import { prisma } from "./prisma";
// exportando um objeto TiposRepo, que contém as funções
// list, listWithSutipos, create e findById

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
