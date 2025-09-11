import { prisma } from "./prisma";

export const SubtiposRepo = {
  list() {
    return prisma.subtipoDeficiencia.findMany({ orderBy: { id: "asc" } });
  },
  findById(id: number) {
    return prisma.subtipoDeficiencia.findUnique({ 
      where: { id } });
  },
   // usado pelo GET /subtipos/:id (com joins + ordenações)
  findDeepById(id: number) {
    return prisma.subtipoDeficiencia.findUnique({
      where: { id },
      include: {
        tipo: true,
        barreiras: {
          include: {
            barreira: {
              include: {
                acessibilidades: {
                  include: { acessibilidade: true },
                  orderBy: { acessibilidadeId: "asc" },
                },
              },
            },
          },
          orderBy: { barreiraId: "asc" },
        },
      },
    });
  },

  create(nome: string, tipoId: number) {
    return prisma.subtipoDeficiencia.create({ data: { nome, tipoId } });
  },
};