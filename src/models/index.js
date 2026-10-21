import Sequelize from "sequelize";
import pg from "pg";

import getPersonModel from "./person.js";
import getEducationModel from "./education.js";
import getExperienceModel from "./experience.js";
import getProjectModel from "./project.js";
import getSkillModel from "./skill.js";
import getLanguageModel from "./language.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "A variável de ambiente DATABASE_URL não foi definida. Crie o arquivo .env com base no .env.sample.",
  );
}

// O NeonDB exige conexão segura (TLS). Quando a URL traz "sslmode=...",
// habilitamos o SSL explicitamente no driver do PostgreSQL.
const sslMode = databaseUrl.match(/[?&]sslmode=([^&]+)/)?.[1];
const useSsl = Boolean(sslMode) && sslMode !== "disable";

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: useSsl ? { ssl: { require: true } } : {},
});

const models = {
  Person: getPersonModel(sequelize, Sequelize),
  Education: getEducationModel(sequelize, Sequelize),
  Experience: getExperienceModel(sequelize, Sequelize),
  Project: getProjectModel(sequelize, Sequelize),
  Skill: getSkillModel(sequelize, Sequelize),
  Language: getLanguageModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
