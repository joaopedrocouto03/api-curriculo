import { required, oneOf } from "../utils/index.js";

export const LANGUAGE_PROFICIENCIES = [
  "Básico",
  "Intermediário",
  "Avançado",
  "Fluente",
  "Nativo",
];

const getLanguageModel = (sequelize, { DataTypes }) => {
  const Language = sequelize.define(
    "language",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("O idioma") },
      },
      proficiency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ...required("O nível de proficiência"),
          ...oneOf("A proficiência", LANGUAGE_PROFICIENCIES),
        },
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "languages" },
  );

  Language.associate = (models) => {
    Language.belongsTo(models.Person, { foreignKey: "personId", as: "person" });
  };

  return Language;
};

export default getLanguageModel;
