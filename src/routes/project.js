import { Router } from "express";
import { projectController } from "../controllers/index.js";

const router = Router();

router.get("/", projectController.getProjects);
router.get("/:projectId", projectController.getProject);
router.post("/", projectController.createProject);
router.put("/:projectId", projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);

export default router;
