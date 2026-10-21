import models from "../models/index.js";

const getAllSkills = async () => {
  return await models.Skill.findAll({ order: [["name", "ASC"]] });
};

const getSkillById = async (id) => {
  return await models.Skill.findByPk(id);
};

const getSkillsByPersonId = async (personId) => {
  return await models.Skill.findAll({
    where: { personId },
    order: [["name", "ASC"]],
  });
};

const createSkill = async ({ personId, name, level }) => {
  return await models.Skill.create({
    personId,
    name,
    level,
  });
};

const updateSkill = async (id, { name, level }) => {
  const skill = await getSkillById(id);
  if (!skill) {
    return null;
  }
  return await skill.update({
    ...(name !== undefined && { name }),
    ...(level !== undefined && { level }),
  });
};

const deleteSkill = async (id) => {
  const count = await models.Skill.destroy({
    where: { id },
  });
  return count > 0;
};

export default {
  getAllSkills,
  getSkillById,
  getSkillsByPersonId,
  createSkill,
  updateSkill,
  deleteSkill,
};
