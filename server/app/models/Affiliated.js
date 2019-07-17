/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  Affiliated = sequelize.define('Affiliated', {
    ProjectID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'ID'
      }
    },
    SectionName: {
      type: DataTypes.STRING(30),
      as: 'Name',
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Section',
        key: 'Name'
      }
    }
  }, {
    tableName: 'Affiliated'
  });

  Affiliated.associate = function (models) {
    models.Project.hasMany(models.Affiliated,
      {
        foreignKey: 'ProjectID',
        as: 'Section'
      });
    models.Section.hasMany(models.Affiliated,
      {
        foreignKey: 'SectionName'
      });
  }

  return Affiliated;
};
