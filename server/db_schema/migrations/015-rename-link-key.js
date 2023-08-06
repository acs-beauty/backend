'use strict';

module.exports = {
  up: async (queryInterface) => {
    await updateTable(queryInterface, 'Brands', 'brandId', 'linkKey');

    await updateTable(queryInterface, 'Categories', 'categoryId', 'linkKey');

    await updateTable(queryInterface, 'Subcategories', 'subcategoryId', 'linkKey');
  },

  down: async (queryInterface) => {
  },
};

async function updateTable(queryInterface, tableName, idColumnName, linkKeyColumnName) {
  const rows = await queryInterface.sequelize.query(
    `SELECT "${idColumnName}", "${linkKeyColumnName}" FROM "${tableName}"`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  const updatePromises = rows.map(async (row) => {
    const newValue = row[linkKeyColumnName].replace(/\//g, '');
    await queryInterface.sequelize.query(
      `UPDATE "${tableName}" SET "${linkKeyColumnName}" = :newValue WHERE "${idColumnName}" = :id`,
      {
        replacements: { newValue, id: row[idColumnName] },
      }
    );
  });

  await Promise.all(updatePromises);
}
