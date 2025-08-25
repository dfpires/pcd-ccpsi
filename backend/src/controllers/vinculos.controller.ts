import { Request, Response } from "express";
import { VinculosService } from "../services/vinculos.service";

export const VinculosController = {
  async vincularBarreiras(req: Request, res: Response) {
    const subtipoId = Number(req.params.id);
    const { barreiraIds } = req.body ?? {};
    const result = await VinculosService.vincularBarreiras(subtipoId, barreiraIds);
    res.json(result);
  },
  async vincularAcessibilidades(req: Request, res: Response) {
    const barreiraId = Number(req.params.id);
    const { acessibilidadeIds } = req.body ?? {};
    const result = await VinculosService.vincularAcessibilidades(barreiraId, acessibilidadeIds);
    res.json(result);
  },
};
