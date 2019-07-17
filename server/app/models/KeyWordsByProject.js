/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  KeyWordsByProject = sequelize.define('KeyWordsByProject', {
    KeyWordsWord: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'KeyWords',
        key: 'Word'
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
      tableName: 'KeyWordsByProject'
    });

/*
  KeyWordsByProject.associate = function (models) {
    models.Project.belongsToMany(models.KeyWords,
      {
        as: 'KeyWord',
        foreignKey: 'ProjectID',
        through: KeyWordsByProject
      });
      models.KeyWords.belongsToMany(models.Project,
        {
          foreignKey: 'KeyWordsWord',
          through: KeyWordsByProject
        });
  }
*/
  
  KeyWordsByProject.associate = function (models) {
    models.Project.hasMany(models.KeyWordsByProject,
      {
        foreignKey: 'ProjectID',
        as: 'KeyWord'
      });
    models.KeyWords.hasMany(models.KeyWordsByProject,
      {
        foreignKey: 'KeyWordsWord'
      });
  }

  return KeyWordsByProject;
};
