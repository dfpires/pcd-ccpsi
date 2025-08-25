import { Request, Response } from "express";
import { AcessService } from "../services/acessibilidades.service";

export const AcessibilidadesController = {
  async list(_req: Request, res: Response) {
    const data = await AcessService.list();
    res.json(data);
  },
  async create(req: Request, res: Response) {
    const { descricao } = req.body ?? {};
    const created = await AcessService.create(descricao);
    res.status(201).json(created);
  },
};
