/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  ExpertPerProject = sequelize.define('ExpertPerProject', {
    ExpertID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Expert',
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
      tableName: 'ExpertPerProject'
    });


  ExpertPerProject.associate = function (models) {
    models.Project.hasMany(models.ExpertPerProject,
      {
        foreignKey: 'ProjectID',
        as: 'Expert'
      });
    models.Expert.hasMany(models.ExpertPerProject,
      {
        foreignKey: 'ExpertID',
        as: 'Project'
      });
  }
  return ExpertPerProject;
};
