// Validadores reutilizáveis dos models, com mensagens em português.

export const required = (label) => ({
  notNull: { msg: `${label} é obrigatório.` },
  notEmpty: { msg: `${label} não pode ser vazio.` },
});

export const validDate = (label) => ({
  isDate: { msg: `${label} deve ser uma data válida (formato AAAA-MM-DD).` },
});

export const validUrl = (label) => ({
  isUrl: { msg: `${label} deve ser uma URL válida.` },
});

export const oneOf = (label, values) => ({
  isIn: {
    args: [values],
    msg: `${label} deve ser um destes valores: ${values.join(", ")}.`,
  },
});
