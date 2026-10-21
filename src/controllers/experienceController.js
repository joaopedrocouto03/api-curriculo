import { experienceService, personService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getExperiences = async (req, res) => {
  const experiences = await experienceService.getAllExperiences();
  return res.status(200).send(experiences);
};

const getExperience = async (req, res) => {
  const experience = await experienceService.getExperienceById(
    req.params.experienceId,
  );
  if (!experience) {
    throw new AppError("Experiência profissional não encontrada.", 404);
  }
  return res.status(200).send(experience);
};

// Relacionamento: lista os itens que pertencem a uma pessoa.
const getExperiencesByPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const experiences = await experienceService.getExperiencesByPersonId(person.id);
  return res.status(200).send(experiences);
};

// Garante que a pessoa existe antes de criar o item vinculado a ela.
const saveNewExperience = async (personId, body) => {
  if (!personId) {
    throw new AppError("O campo personId é obrigatório.", 400);
  }
  const person = await personService.getPersonById(personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const { company, role, startDate, endDate, description } = body || {};
  return await experienceService.createExperience({
    personId: person.id,
    company,
    role,
    startDate,
    endDate,
    description,
  });
};

const createExperience = async (req, res) => {
  const experience = await saveNewExperience(req.body?.personId, req.body);
  return res.status(201).send(experience);
};

const createExperienceForPerson = async (req, res) => {
  const experience = await saveNewExperience(req.params.personId, req.body);
  return res.status(201).send(experience);
};

const updateExperience = async (req, res) => {
  const { company, role, startDate, endDate, description } = req.body || {};
  const experience = await experienceService.updateExperience(
    req.params.experienceId,
    {
      company,
      role,
      startDate,
      endDate,
      description,
    },
  );
  if (!experience) {
    throw new AppError("Experiência profissional não encontrada.", 404);
  }
  return res.status(200).send(experience);
};

const deleteExperience = async (req, res) => {
  const isDeleted = await experienceService.deleteExperience(
    req.params.experienceId,
  );
  if (!isDeleted) {
    throw new AppError("Experiência profissional não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getExperiences,
  getExperience,
  getExperiencesByPerson,
  createExperience,
  createExperienceForPerson,
  updateExperience,
  deleteExperience,
};
