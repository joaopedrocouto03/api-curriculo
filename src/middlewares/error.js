import { AppError } from "../utils/index.js";

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // O stack trace só é exibido ao cliente em ambiente de desenvolvimento.
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.error(err.stack);
  } else {
    console.error(`${err.name || "Error"}: ${err.message}`);
  }

  const respond = (statusCode, status, message) =>
    res.status(statusCode).send({
      status,
      message,
      ...(isDev && { stack: err.stack }),
    });

  if (err instanceof AppError) {
    return respond(err.statusCode, err.status, err.message);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const fields = err.errors
      ?.map((e) => e.path)
      .filter(Boolean)
      .join(", ");
    return respond(
      409,
      "fail",
      fields
        ? `Registro duplicado: já existe um registro com o mesmo valor em: ${fields}.`
        : "Registro duplicado.",
    );
  }

  if (err.name === "SequelizeValidationError") {
    return respond(
      400,
      "fail",
      err.errors?.length
        ? err.errors.map((e) => e.message).join(" ")
        : err.message,
    );
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return respond(
      400,
      "fail",
      "Referência inválida: o registro relacionado não existe.",
    );
  }

  if (err.name === "SequelizeDatabaseError" && err.original?.code === "22P02") {
    return respond(
      400,
      "fail",
      "Identificador (ID) fornecido possui formato inválido.",
    );
  }

  if (err.type === "entity.parse.failed") {
    return respond(400, "fail", "O corpo da requisição não é um JSON válido.");
  }

  return respond(500, "error", "Algo deu errado no servidor.");
};

export default errorMiddleware;
