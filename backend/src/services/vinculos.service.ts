import { SubtiposRepo } from "../repositories/subtipos.repo";
import { BarreirasRepo } from "../repositories/barreiras.repo";
import { AcessRepo } from "../repositories/acessibilidades.repo";
import { VinculosRepo } from "../repositories/vinculos.repo";

export const VinculosService = {
  async vincularBarreiras(subtipoId: number, barreiraIds: number[]) {
    if (!Array.isArray(barreiraIds) || barreiraIds.length === 0) {
      throw Object.assign(new Error("barreiraIds deve ser um array com pelo menos 1 id"), { status: 400 });
    }

    const subtipo = await SubtiposRepo.findById(subtipoId);
    if (!subtipo) throw Object.assign(new Error("Subtipo não encontrado"), { status: 404 });

    for (const id of barreiraIds) {
      const b = await BarreirasRepo.findById(id);
      if (!b) throw Object.assign(new Error(`Barreira ${id} não encontrada`), { status: 404 });
    }

    await VinculosRepo.vincularBarreirasSubtipo(subtipoId, barreiraIds);
    return { ok: true };
  },

  async vincularAcessibilidades(barreiraId: number, acessibilidadeIds: number[]) {
    if (!Array.isArray(acessibilidadeIds) || acessibilidadeIds.length === 0) {
      throw Object.assign(new Error("acessibilidadeIds deve ser um array com pelo menos 1 id"), { status: 400 });
    }

    const barreira = await BarreirasRepo.findById(barreiraId);
    if (!barreira) throw Object.assign(new Error("Barreira não encontrada"), { status: 404 });

    for (const id of acessibilidadeIds) {
      const a = await AcessRepo.findById(id);
      if (!a) throw Object.assign(new Error(`Acessibilidade ${id} não encontrada`), { status: 404 });
    }

    await VinculosRepo.vincularAcessBarreira(barreiraId, acessibilidadeIds);
    return { ok: true };
  },
};