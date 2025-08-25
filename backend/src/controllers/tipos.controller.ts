import { Request, Response } from "express";
import { TiposService } from "../services/tipos.service";

export const TiposController = {
  async list(_req: Request, res: Response) {
    const data = await TiposService.list();
    res.json(data);
  },
  async listWithSubtipos(_req: Request, res: Response) {
    const data = await TiposService.listWithSubtipos();
    res.json(data);
  },
  async create(req: Request, res: Response) {
    const { nome } = req.body ?? {};
    const created = await TiposService.create(nome);
    res.status(201).json(created);
  },
};