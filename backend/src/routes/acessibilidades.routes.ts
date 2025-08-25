import { Router } from "express";
import { AcessibilidadesController } from "../controllers/acessibilidades.controller";
const router = Router();

router.get("/", AcessibilidadesController.list); // /acessibilidades
router.post("/", AcessibilidadesController.create);

export default router;
