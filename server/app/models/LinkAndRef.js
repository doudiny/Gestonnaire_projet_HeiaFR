/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LinkAndRef', {
    ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Link: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'LinkAndRef'
  });
};
