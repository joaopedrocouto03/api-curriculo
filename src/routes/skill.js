import { Router } from "express";
import { skillController } from "../controllers/index.js";

const router = Router();

router.get("/", skillController.getSkills);
router.get("/:skillId", skillController.getSkill);
router.post("/", skillController.createSkill);
router.put("/:skillId", skillController.updateSkill);
router.delete("/:skillId", skillController.deleteSkill);

export default router;
