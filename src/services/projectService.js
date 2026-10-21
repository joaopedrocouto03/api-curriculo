import models from "../models/index.js";

const getAllProjects = async () => {
  return await models.Project.findAll({ order: [["name", "ASC"]] });
};

const getProjectById = async (id) => {
  return await models.Project.findByPk(id);
};

const getProjectsByPersonId = async (personId) => {
  return await models.Project.findAll({
    where: { personId },
    order: [["name", "ASC"]],
  });
};

const createProject = async ({ personId, name, description, technologies, repositoryUrl, deployUrl }) => {
  return await models.Project.create({
    personId,
    name,
    description,
    technologies,
    repositoryUrl,
    deployUrl,
  });
};

const updateProject = async (id, { name, description, technologies, repositoryUrl, deployUrl }) => {
  const project = await getProjectById(id);
  if (!project) {
    return null;
  }
  return await project.update({
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(technologies !== undefined && { technologies }),
    ...(repositoryUrl !== undefined && { repositoryUrl }),
    ...(deployUrl !== undefined && { deployUrl }),
  });
};

const deleteProject = async (id) => {
  const count = await models.Project.destroy({
    where: { id },
  });
  return count > 0;
};

export default {
  getAllProjects,
  getProjectById,
  getProjectsByPersonId,
  createProject,
  updateProject,
  deleteProject,
};
