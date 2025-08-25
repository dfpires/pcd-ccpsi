import { Router } from "express";
import { VinculosController } from "../controllers/vinculos.controller";
const router = Router();

// POST /subtipos/:id/barreiras  (N:N)
router.post("/subtipos/:id/barreiras", VinculosController.vincularBarreiras);

// POST /barreiras/:id/acessibilidades  (N:N)
router.post("/barreiras/:id/acessibilidades", VinculosController.vincularAcessibilidades);

export default router;
