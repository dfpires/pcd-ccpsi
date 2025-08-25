import { Router } from "express";
import { TiposController } from "../controllers/tipos.controller";
const router = Router();

router.get("/", TiposController.list);                 // /tipos
router.get("/com-subtipos", TiposController.listWithSubtipos); // /tipos/com-subtipos
router.post("/", TiposController.create);              // /tipos

export default router;
