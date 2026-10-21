import { projectService, personService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getProjects = async (req, res) => {
  const projects = await projectService.getAllProjects();
  return res.status(200).send(projects);
};

const getProject = async (req, res) => {
  const project = await projectService.getProjectById(
    req.params.projectId,
  );
  if (!project) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  return res.status(200).send(project);
};

// Relacionamento: lista os itens que pertencem a uma pessoa.
const getProjectsByPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const projects = await projectService.getProjectsByPersonId(person.id);
  return res.status(200).send(projects);
};

// Garante que a pessoa existe antes de criar o item vinculado a ela.
const saveNewProject = async (personId, body) => {
  if (!personId) {
    throw new AppError("O campo personId é obrigatório.", 400);
  }
  const person = await personService.getPersonById(personId);
  if (!person) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  const { name, description, technologies, repositoryUrl, deployUrl } = body || {};
  return await projectService.createProject({
    personId: person.id,
    name,
    description,
    technologies,
    repositoryUrl,
    deployUrl,
  });
};

const createProject = async (req, res) => {
  const project = await saveNewProject(req.body?.personId, req.body);
  return res.status(201).send(project);
};

const createProjectForPerson = async (req, res) => {
  const project = await saveNewProject(req.params.personId, req.body);
  return res.status(201).send(project);
};

const updateProject = async (req, res) => {
  const { name, description, technologies, repositoryUrl, deployUrl } = req.body || {};
  const project = await projectService.updateProject(
    req.params.projectId,
    {
      name,
      description,
      technologies,
      repositoryUrl,
      deployUrl,
    },
  );
  if (!project) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  return res.status(200).send(project);
};

const deleteProject = async (req, res) => {
  const isDeleted = await projectService.deleteProject(
    req.params.projectId,
  );
  if (!isDeleted) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  return res.status(204).send();
};

export default {
  getProjects,
  getProject,
  getProjectsByPerson,
  createProject,
  createProjectForPerson,
  updateProject,
  deleteProject,
};
