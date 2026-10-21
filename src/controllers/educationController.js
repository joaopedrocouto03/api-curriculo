import { educationService, personService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getEducations = async (req, res) => {
  const educations = await educationService.getAllEducations();
  return res.status(200).send(educations);
};

const getEducation = async (req, res) => {
  const education = await educationService.getEducationById(
    req.params.educationId,
  );
  if (!education) {
    throw new AppError("Formação acadêmica não encontrada.", 404);
  }
  return res.status(200).send(education);
};

// Relacionamento: lista os itens que pertencem a uma pessoa.
const getEducationsByPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const educations = await educationService.getEducationsByPersonId(person.id);
  return res.status(200).send(educations);
};

// Garante que a pessoa existe antes de criar o item vinculado a ela.
const saveNewEducation = async (personId, body) => {
  if (!personId) {
    throw new AppError("O campo personId é obrigatório.", 400);
  }
  const person = await personService.getPersonById(personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const { institution, course, level, startDate, endDate, description } = body || {};
  return await educationService.createEducation({
    personId: person.id,
    institution,
    course,
    level,
    startDate,
    endDate,
    description,
  });
};

const createEducation = async (req, res) => {
  const education = await saveNewEducation(req.body?.personId, req.body);
  return res.status(201).send(education);
};

const createEducationForPerson = async (req, res) => {
  const education = await saveNewEducation(req.params.personId, req.body);
  return res.status(201).send(education);
};

const updateEducation = async (req, res) => {
  const { institution, course, level, startDate, endDate, description } = req.body || {};
  const education = await educationService.updateEducation(
    req.params.educationId,
    {
      institution,
      course,
      level,
      startDate,
      endDate,
      description,
    },
  );
  if (!education) {
    throw new AppError("Formação acadêmica não encontrada.", 404);
  }
  return res.status(200).send(education);
};

const deleteEducation = async (req, res) => {
  const isDeleted = await educationService.deleteEducation(
    req.params.educationId,
  );
  if (!isDeleted) {
    throw new AppError("Formação acadêmica não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getEducations,
  getEducation,
  getEducationsByPerson,
  createEducation,
  createEducationForPerson,
  updateEducation,
  deleteEducation,
};
