import "dotenv/config";
import express from "express";
import models, { sequelize } from "./models/index.js";
import {
  corsMiddleware,
  logMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";
import * as routes from "./routes/index.js";
import { createPeopleWithResumes } from "./seeds/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

// rotas
app.get("/", (req, res) => {
  return res.send("API de currículos executando...");
});
app.use("/people", routes.person);
app.use("/educations", routes.education);
app.use("/experiences", routes.experience);
app.use("/projects", routes.project);
app.use("/skills", routes.skill);
app.use("/languages", routes.language);

// rota não encontrada (404)
app.use(notFoundMiddleware);

// middleware global de erro
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";
const syncDatabase =
  process.env.SYNC_DATABASE === "true" || eraseDatabaseOnSync;

const startServer = () => {
  app.listen(port, () => console.log(`API de currículos ouvindo na porta ${port}!`));
};

if (syncDatabase) {
  sequelize
    .sync({ force: eraseDatabaseOnSync })
    .then(async () => {
      if (eraseDatabaseOnSync) {
        await createPeopleWithResumes(models);
      }
      startServer();
    })
    .catch((error) => {
      console.error("Falha ao sincronizar o banco de dados:", error.message);
      process.exit(1);
    });
} else {
  startServer();
}

export default app;
