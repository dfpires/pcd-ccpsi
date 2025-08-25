import { prisma } from "./prisma";

export const VinculosRepo = {
  vincularBarreirasSubtipo(subtipoId: number, barreiraIds: number[]) {
    return prisma.subtipoBarreira.createMany({
      data: barreiraIds.map((barreiraId) => ({ subtipoId, barreiraId })),
      skipDuplicates: true,
    });
  },
  vincularAcessBarreira(barreiraId: number, acessibilidadeIds: number[]) {
    return prisma.barreiraAcessibilidade.createMany({
      data: acessibilidadeIds.map((acessibilidadeId) => ({ barreiraId, acessibilidadeId })),
      skipDuplicates: true,
    });
  },
};