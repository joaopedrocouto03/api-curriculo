import { Router } from "express";
import {
  personController,
  educationController,
  experienceController,
  projectController,
  skillController,
  languageController,
} from "../controllers/index.js";

const router = Router();

router.get("/", personController.getPeople);
router.get("/:personId", personController.getPerson);
router.post("/", personController.createPerson);
router.put("/:personId", personController.updatePerson);
router.delete("/:personId", personController.deletePerson);

// relacionamentos: itens do currículo vinculados a uma pessoa
router.get("/:personId/educations", educationController.getEducationsByPerson);
router.post(
  "/:personId/educations",
  educationController.createEducationForPerson,
);

router.get("/:personId/experiences", experienceController.getExperiencesByPerson);
router.post(
  "/:personId/experiences",
  experienceController.createExperienceForPerson,
);

router.get("/:personId/projects", projectController.getProjectsByPerson);
router.post(
  "/:personId/projects",
  projectController.createProjectForPerson,
);

router.get("/:personId/skills", skillController.getSkillsByPerson);
router.post(
  "/:personId/skills",
  skillController.createSkillForPerson,
);

router.get("/:personId/languages", languageController.getLanguagesByPerson);
router.post(
  "/:personId/languages",
  languageController.createLanguageForPerson,
);

export default router;
