/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Section', {
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'Section'
  });
};
