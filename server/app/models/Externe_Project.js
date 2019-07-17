/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  Externe_Project = sequelize.define('Externe_Project', {
    ExterneID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Externe',
        key: 'ID'
      }
    },
    ProjectID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'ID'
      }
    }
  }, {
    tableName: 'Externe_Project'
  });

  Externe_Project.associate = function (models) {
    models.Project.hasMany(models.Externe_Project,
      {
        foreignKey: 'ProjectID',
        as: 'ResponsableExterne'
      });
    models.Section.hasMany(models.Externe_Project,
      {
        foreignKey: 'ExterneID'
      });
  }

  return Externe_Project;
};
