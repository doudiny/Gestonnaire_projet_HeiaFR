/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  Choices = sequelize.define('Choices', {
    ProjectID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'ID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'ID'
      }
    },
    Weight: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
      tableName: 'Choices'
    });
  Choices.associate = function (models) {
    models.Choices.belongsTo(models.User,
      {
        as: 'StudentChoice',
        foreignKey: 'UserID',
        constraints: false,
      })
  }
  return Choices
};
