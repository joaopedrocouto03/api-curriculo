import models from "../models/index.js";

const getAllEducations = async () => {
  return await models.Education.findAll({ order: [["startDate", "DESC"]] });
};

const getEducationById = async (id) => {
  return await models.Education.findByPk(id);
};

const getEducationsByPersonId = async (personId) => {
  return await models.Education.findAll({
    where: { personId },
    order: [["startDate", "DESC"]],
  });
};

const createEducation = async ({ personId, institution, course, level, startDate, endDate, description }) => {
  return await models.Education.create({
    personId,
    institution,
    course,
    level,
    startDate,
    endDate,
    description,
  });
};

const updateEducation = async (id, { institution, course, level, startDate, endDate, description }) => {
  const education = await getEducationById(id);
  if (!education) {
    return null;
  }
  return await education.update({
    ...(institution !== undefined && { institution }),
    ...(course !== undefined && { course }),
    ...(level !== undefined && { level }),
    ...(startDate !== undefined && { startDate }),
    ...(endDate !== undefined && { endDate }),
    ...(description !== undefined && { description }),
  });
};

const deleteEducation = async (id) => {
  const count = await models.Education.destroy({
    where: { id },
  });
  return count > 0;
};

export default {
  getAllEducations,
  getEducationById,
  getEducationsByPersonId,
  createEducation,
  updateEducation,
  deleteEducation,
};
