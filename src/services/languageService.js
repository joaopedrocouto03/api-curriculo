import models from "../models/index.js";

const getAllLanguages = async () => {
  return await models.Language.findAll({ order: [["name", "ASC"]] });
};

const getLanguageById = async (id) => {
  return await models.Language.findByPk(id);
};

const getLanguagesByPersonId = async (personId) => {
  return await models.Language.findAll({
    where: { personId },
    order: [["name", "ASC"]],
  });
};

const createLanguage = async ({ personId, name, proficiency }) => {
  return await models.Language.create({
    personId,
    name,
    proficiency,
  });
};

const updateLanguage = async (id, { name, proficiency }) => {
  const language = await getLanguageById(id);
  if (!language) {
    return null;
  }
  return await language.update({
    ...(name !== undefined && { name }),
    ...(proficiency !== undefined && { proficiency }),
  });
};

const deleteLanguage = async (id) => {
  const count = await models.Language.destroy({
    where: { id },
  });
  return count > 0;
};

export default {
  getAllLanguages,
  getLanguageById,
  getLanguagesByPersonId,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
