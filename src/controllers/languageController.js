import { languageService, personService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getLanguages = async (req, res) => {
  const languages = await languageService.getAllLanguages();
  return res.status(200).send(languages);
};

const getLanguage = async (req, res) => {
  const language = await languageService.getLanguageById(
    req.params.languageId,
  );
  if (!language) {
    throw new AppError("Idioma não encontrado.", 404);
  }
  return res.status(200).send(language);
};

// Relacionamento: lista os itens que pertencem a uma pessoa.
const getLanguagesByPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const languages = await languageService.getLanguagesByPersonId(person.id);
  return res.status(200).send(languages);
};

// Garante que a pessoa existe antes de criar o item vinculado a ela.
const saveNewLanguage = async (personId, body) => {
  if (!personId) {
    throw new AppError("O campo personId é obrigatório.", 400);
  }
  const person = await personService.getPersonById(personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const { name, proficiency } = body || {};
  return await languageService.createLanguage({
    personId: person.id,
    name,
    proficiency,
  });
};

const createLanguage = async (req, res) => {
  const language = await saveNewLanguage(req.body?.personId, req.body);
  return res.status(201).send(language);
};

const createLanguageForPerson = async (req, res) => {
  const language = await saveNewLanguage(req.params.personId, req.body);
  return res.status(201).send(language);
};

const updateLanguage = async (req, res) => {
  const { name, proficiency } = req.body || {};
  const language = await languageService.updateLanguage(
    req.params.languageId,
    {
      name,
      proficiency,
    },
  );
  if (!language) {
    throw new AppError("Idioma não encontrado.", 404);
  }
  return res.status(200).send(language);
};

const deleteLanguage = async (req, res) => {
  const isDeleted = await languageService.deleteLanguage(
    req.params.languageId,
  );
  if (!isDeleted) {
    throw new AppError("Idioma não encontrado.", 404);
  }
  return res.status(204).send();
};

export default {
  getLanguages,
  getLanguage,
  getLanguagesByPerson,
  createLanguage,
  createLanguageForPerson,
  updateLanguage,
  deleteLanguage,
};
