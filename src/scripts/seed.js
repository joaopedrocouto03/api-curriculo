// Recria as tabelas e cadastra os currículos de exemplo no banco.
// Uso: npm run seed
// ATENÇÃO: apaga todas as tabelas do banco apontado por DATABASE_URL.
import "dotenv/config";
import models, { sequelize } from "../models/index.js";
import { createPeopleWithResumes } from "../seeds/index.js";

const run = async () => {
  try {
    await sequelize.sync({ force: true });
    await createPeopleWithResumes(models);

    const people = await models.Person.count();
    console.log(`Banco recriado com sucesso. Pessoas cadastradas: ${people}.`);
  } catch (error) {
    console.error("Falha ao executar o seed:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

run();
