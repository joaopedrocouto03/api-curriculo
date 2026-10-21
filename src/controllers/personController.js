import { personService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getPeople = async (req, res) => {
  const people = await personService.getAllPeople();
  return res.status(200).send(people);
};

// Retorna o currículo completo (pessoa + formações, experiências, projetos,
// habilidades e idiomas).
const getPerson = async (req, res) => {
  const person = await personService.getPersonWithResume(req.params.personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  return res.status(200).send(person);
};

const createPerson = async (req, res) => {
  const { name, email, phone, headline, summary, city, linkedinUrl, githubUrl } =
    req.body || {};
  const person = await personService.createPerson({
    name,
    email,
    phone,
    headline,
    summary,
    city,
    linkedinUrl,
    githubUrl,
  });
  return res.status(201).send(person);
};

const updatePerson = async (req, res) => {
  const { name, email, phone, headline, summary, city, linkedinUrl, githubUrl } =
    req.body || {};
  const person = await personService.updatePerson(req.params.personId, {
    name,
    email,
    phone,
    headline,
    summary,
    city,
    linkedinUrl,
    githubUrl,
  });
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  return res.status(200).send(person);
};

const deletePerson = async (req, res) => {
  const isDeleted = await personService.deletePerson(req.params.personId);
  if (!isDeleted) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
