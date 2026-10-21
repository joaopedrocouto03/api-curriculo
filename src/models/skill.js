import { required, oneOf } from "../utils/index.js";

export const SKILL_LEVELS = ["Básico", "Intermediário", "Avançado"];

const getSkillModel = (sequelize, { DataTypes }) => {
  const Skill = sequelize.define(
    "skill",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { ...required("O nome da habilidade") },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ...required("O nível"),
          ...oneOf("O nível", SKILL_LEVELS),
        },
      },
      personId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { tableName: "skills" },
  );

  Skill.associate = (models) => {
    Skill.belongsTo(models.Person, { foreignKey: "personId", as: "person" });
  };

  return Skill;
};

export default getSkillModel;
