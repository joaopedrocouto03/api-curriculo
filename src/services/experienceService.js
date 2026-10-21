import models from "../models/index.js";

const getAllExperiences = async () => {
  return await models.Experience.findAll({ order: [["startDate", "DESC"]] });
};

const getExperienceById = async (id) => {
  return await models.Experience.findByPk(id);
};

const getExperiencesByPersonId = async (personId) => {
  return await models.Experience.findAll({
    where: { personId },
    order: [["startDate", "DESC"]],
  });
};

const createExperience = async ({ personId, company, role, startDate, endDate, description }) => {
  return await models.Experience.create({
    personId,
    company,
    role,
    startDate,
    endDate,
    description,
  });
};

const updateExperience = async (id, { company, role, startDate, endDate, description }) => {
  const experience = await getExperienceById(id);
  if (!experience) {
    return null;
  }
  return await experience.update({
    ...(company !== undefined && { company }),
    ...(role !== undefined && { role }),
    ...(startDate !== undefined && { startDate }),
    ...(endDate !== undefined && { endDate }),
    ...(description !== undefined && { description }),
  });
};

const deleteExperience = async (id) => {
  const count = await models.Experience.destroy({
    where: { id },
  });
  return count > 0;
};

export default {
  getAllExperiences,
  getExperienceById,
  getExperiencesByPersonId,
  createExperience,
  updateExperience,
  deleteExperience,
};
