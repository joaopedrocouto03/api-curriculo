import { required, validUrl } from "../utils/index.js";

const getPersonModel = (sequelize, { DataTypes }) => {
  const Person = sequelize.define(
    "person",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("O nome") },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          ...required("O e-mail"),
          isEmail: { msg: "O e-mail deve ser um endereço válido." },
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      headline: {
        type: DataTypes.STRING,
      },
      summary: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.STRING,
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        validate: { ...validUrl("O LinkedIn") },
      },
      githubUrl: {
        type: DataTypes.STRING,
        validate: { ...validUrl("O GitHub") },
      },
    },
    { tableName: "people" },
  );

  Person.associate = (models) => {
    const options = { foreignKey: "personId", onDelete: "CASCADE" };

    Person.hasMany(models.Education, { ...options, as: "educations" });
    Person.hasMany(models.Experience, { ...options, as: "experiences" });
    Person.hasMany(models.Project, { ...options, as: "projects" });
    Person.hasMany(models.Skill, { ...options, as: "skills" });
    Person.hasMany(models.Language, { ...options, as: "languages" });
  };

  return Person;
};

export default getPersonModel;
