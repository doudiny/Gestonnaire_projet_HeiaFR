/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('KeyWords', {
    Word: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'KeyWords'
  });
};
