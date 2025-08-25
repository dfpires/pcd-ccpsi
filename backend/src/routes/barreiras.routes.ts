import { Router } from "express";
import { BarreirasController } from "../controllers/barreiras.controller";
const router = Router();

router.get("/", BarreirasController.list);  // /barreiras
router.post("/", BarreirasController.create);

export default router;
