import { Router } from "express";
import { educationController } from "../controllers/index.js";

const router = Router();

router.get("/", educationController.getEducations);
router.get("/:educationId", educationController.getEducation);
router.post("/", educationController.createEducation);
router.put("/:educationId", educationController.updateEducation);
router.delete("/:educationId", educationController.deleteEducation);

export default router;
