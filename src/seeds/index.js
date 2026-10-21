import people from "./people.js";

// Cadastra cada pessoa e, em seguida, as seções do currículo vinculadas a ela.
export const createPeopleWithResumes = async (models) => {
  for (const data of people) {
    const { educations, experiences, projects, skills, languages, ...profile } =
      data;

    const person = await models.Person.create(profile);

    const withPerson = (items) =>
      items.map((item) => ({ ...item, personId: person.id }));

    await models.Education.bulkCreate(withPerson(educations), {
      validate: true,
    });
    await models.Experience.bulkCreate(withPerson(experiences), {
      validate: true,
    });
    await models.Project.bulkCreate(withPerson(projects), { validate: true });
    await models.Skill.bulkCreate(withPerson(skills), { validate: true });
    await models.Language.bulkCreate(withPerson(languages), { validate: true });
  }
};
