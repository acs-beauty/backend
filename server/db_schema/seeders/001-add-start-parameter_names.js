const startParameterNames = [
  {
    nameKey: "age",
    value: "Вік",
  },
  {
    nameKey: "volume",
    value: "Об'єм тари",
  },
  {
    nameKey: "skinType",
    value: "Тип шкіри",
  },
  {
    nameKey: "protectionLevel",
    value: "Ступінь захисту",
  },
  {
    nameKey: "hairType",
    value: "Тип волосся",
  },
  {
    nameKey: "applyTime",
    value: "Час нанесення",
  },
  {
    nameKey: "color",
    value: "Колір",
  },
  {
    nameKey: "effect",
    value: "Ефект",
  },
  {
    nameKey: "productType",
    value: "Тип засобу",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ParameterNames", startParameterNames, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ParameterNames", null, {});
  },
};