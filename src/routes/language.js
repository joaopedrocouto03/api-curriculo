import { Router } from "express";
import { languageController } from "../controllers/index.js";

const router = Router();

router.get("/", languageController.getLanguages);
router.get("/:languageId", languageController.getLanguage);
router.post("/", languageController.createLanguage);
router.put("/:languageId", languageController.updateLanguage);
router.delete("/:languageId", languageController.deleteLanguage);

export default router;
