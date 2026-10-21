import { required, validUrl } from "../utils/index.js";

const getProjectModel = (sequelize, { DataTypes }) => {
  const Project = sequelize.define(
    "project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("O nome do projeto") },
      },
      description: {
        type: DataTypes.TEXT,
      },
      technologies: {
        type: DataTypes.STRING,
      },
      repositoryUrl: {
        type: DataTypes.STRING,
        validate: { ...validUrl("A URL do repositório") },
      },
      deployUrl: {
        type: DataTypes.STRING,
        validate: { ...validUrl("A URL do projeto publicado") },
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "projects" },
  );

  Project.associate = (models) => {
    Project.belongsTo(models.Person, { foreignKey: "personId", as: "person" });
  };

  return Project;
};

export default getProjectModel;
