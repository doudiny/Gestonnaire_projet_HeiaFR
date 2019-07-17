/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  InCharge =  sequelize.define('InCharge', {
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
    }
  }, {
    tableName: 'InCharge'
  });

  InCharge.associate = function (models) {
    models.Project.hasMany(models.InCharge,
      {
        foreignKey: 'ProjectID',
        as: 'ReponsableInterne'
      });
    models.User.hasMany(models.InCharge,
      {
        foreignKey: 'UserID'
      });
  }

  return InCharge
};
