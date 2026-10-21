import { required, validDate, oneOf } from "../utils/index.js";

export const EDUCATION_LEVELS = [
  "Ensino Médio",
  "Técnico",
  "Graduação",
  "Pós-graduação",
  "Mestrado",
  "Doutorado",
  "Curso livre",
];

const getEducationModel = (sequelize, { DataTypes }) => {
  const Education = sequelize.define(
    "education",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("A instituição") },
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("O curso") },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ...required("O nível"),
          ...oneOf("O nível", EDUCATION_LEVELS),
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: "A data de início é obrigatória." },
          ...validDate("A data de início"),
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        validate: { ...validDate("A data de término") },
      },
      description: {
        type: DataTypes.TEXT,
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "educations",
      validate: {
        endDateAfterStartDate() {
          if (this.startDate && this.endDate && this.endDate < this.startDate) {
            throw new Error(
              "A data de término não pode ser anterior à data de início.",
            );
          }
        },
      },
    },
  );

  Education.associate = (models) => {
    Education.belongsTo(models.Person, { foreignKey: "personId", as: "person" });
  };

  return Education;
};

export default getEducationModel;
