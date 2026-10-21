import models from "../models/index.js";

const getAllPeople = async () => {
  return await models.Person.findAll({ order: [["name", "ASC"]] });
};

const getPersonById = async (id) => {
  return await models.Person.findByPk(id);
};

// Currículo completo: a pessoa com todas as suas seções relacionadas.
const getPersonWithResume = async (id) => {
  return await models.Person.findByPk(id, {
    include: [
      { model: models.Education, as: "educations" },
      { model: models.Experience, as: "experiences" },
      { model: models.Project, as: "projects" },
      { model: models.Skill, as: "skills" },
      { model: models.Language, as: "languages" },
    ],
    order: [
      [{ model: models.Education, as: "educations" }, "startDate", "DESC"],
      [{ model: models.Experience, as: "experiences" }, "startDate", "DESC"],
      [{ model: models.Project, as: "projects" }, "name", "ASC"],
      [{ model: models.Skill, as: "skills" }, "name", "ASC"],
      [{ model: models.Language, as: "languages" }, "name", "ASC"],
    ],
  });
};

const createPerson = async ({
  name,
  email,
  phone,
  headline,
  summary,
  city,
  linkedinUrl,
  githubUrl,
}) => {
  return await models.Person.create({
    name,
    email,
    phone,
    headline,
    summary,
    city,
    linkedinUrl,
    githubUrl,
  });
};

const updatePerson = async (
  id,
  { name, email, phone, headline, summary, city, linkedinUrl, githubUrl },
) => {
  const person = await getPersonById(id);
  if (!person) {
    return null;
  }
  return await person.update({
    ...(name !== undefined && { name }),
    ...(email !== undefined && { email }),
    ...(phone !== undefined && { phone }),
    ...(headline !== undefined && { headline }),
    ...(summary !== undefined && { summary }),
    ...(city !== undefined && { city }),
    ...(linkedinUrl !== undefined && { linkedinUrl }),
    ...(githubUrl !== undefined && { githubUrl }),
  });
};

const deletePerson = async (id) => {
  const count = await models.Person.destroy({
    where: { id },
  });
  return count > 0;
};

export default {
  getAllPeople,
  getPersonById,
  getPersonWithResume,
  createPerson,
  updatePerson,
  deletePerson,
};
