import { Router } from "express";
import { experienceController } from "../controllers/index.js";

const router = Router();

router.get("/", experienceController.getExperiences);
router.get("/:experienceId", experienceController.getExperience);
router.post("/", experienceController.createExperience);
router.put("/:experienceId", experienceController.updateExperience);
router.delete("/:experienceId", experienceController.deleteExperience);

export default router;
