import { required, validDate } from "../utils/index.js";

const getExperienceModel = (sequelize, { DataTypes }) => {
  const Experience = sequelize.define(
    "experience",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("A empresa") },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("O cargo") },
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
      tableName: "experiences",
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

  Experience.associate = (models) => {
    Experience.belongsTo(models.Person, {
      foreignKey: "personId",
      as: "person",
    });
  };

  return Experience;
};

export default getExperienceModel;
