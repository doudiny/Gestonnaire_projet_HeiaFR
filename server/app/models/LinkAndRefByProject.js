/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  LinkAndRefByProject = sequelize.define('LinkAndRefByProject', {
    LinkAndRefID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LinkAndRef',
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
    tableName: 'LinkAndRef_Project'
  });

  LinkAndRefByProject.associate = function (models) {
    models.Project.hasMany(models.LinkAndRefByProject,
      {
        foreignKey: 'ProjectID'
      });
    models.LinkAndRef.hasMany(models.LinkAndRefByProject,
      {
        foreignKey: 'LinkAndRefID',
        as : 'Project'
      });
  }
  return LinkAndRefByProject;
};
