/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Type', {
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    CreditECTS: {
      type: "DOUBLE",
      allowNull: false
    }
  }, {
    tableName: 'Type'
  });
};
