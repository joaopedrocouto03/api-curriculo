import { skillService, personService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getSkills = async (req, res) => {
  const skills = await skillService.getAllSkills();
  return res.status(200).send(skills);
};

const getSkill = async (req, res) => {
  const skill = await skillService.getSkillById(
    req.params.skillId,
  );
  if (!skill) {
    throw new AppError("Habilidade não encontrada.", 404);
  }
  return res.status(200).send(skill);
};

// Relacionamento: lista os itens que pertencem a uma pessoa.
const getSkillsByPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const skills = await skillService.getSkillsByPersonId(person.id);
  return res.status(200).send(skills);
};

// Garante que a pessoa existe antes de criar o item vinculado a ela.
const saveNewSkill = async (personId, body) => {
  if (!personId) {
    throw new AppError("O campo personId é obrigatório.", 400);
  }
  const person = await personService.getPersonById(personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const { name, level } = body || {};
  return await skillService.createSkill({
    personId: person.id,
    name,
    level,
  });
};

const createSkill = async (req, res) => {
  const skill = await saveNewSkill(req.body?.personId, req.body);
  return res.status(201).send(skill);
};

const createSkillForPerson = async (req, res) => {
  const skill = await saveNewSkill(req.params.personId, req.body);
  return res.status(201).send(skill);
};

const updateSkill = async (req, res) => {
  const { name, level } = req.body || {};
  const skill = await skillService.updateSkill(
    req.params.skillId,
    {
      name,
      level,
    },
  );
  if (!skill) {
    throw new AppError("Habilidade não encontrada.", 404);
  }
  return res.status(200).send(skill);
};

const deleteSkill = async (req, res) => {
  const isDeleted = await skillService.deleteSkill(
    req.params.skillId,
  );
  if (!isDeleted) {
    throw new AppError("Habilidade não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getSkills,
  getSkill,
  getSkillsByPerson,
  createSkill,
  createSkillForPerson,
  updateSkill,
  deleteSkill,
};
