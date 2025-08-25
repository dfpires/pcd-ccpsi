import { Router } from "express";
import tipos from "./tipos.routes";
import subtipos from "./subtipos.routes";
import barreiras from "./barreiras.routes";
import acessibilidades from "./acessibilidades.routes";
import vinculos from "./vinculos.routes";

const router = Router();

router.use("/tipos", tipos);
router.use("/subtipos", subtipos);
router.use("/barreiras", barreiras);
router.use("/acessibilidades", acessibilidades);
router.use("/", vinculos); // rotas de vínculo

export default router;