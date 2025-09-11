import { Router } from "express";
import { SubtiposController } from "../controllers/subtipos.controller";
const router = Router();

router.get("/:id", SubtiposController.getOne); // /subtipos/:id
router.get("/", SubtiposController.list) // /subtipo
router.post("/", SubtiposController.create);   // /subtipos

export default router;
