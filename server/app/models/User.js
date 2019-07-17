/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  User = sequelize.define('User', {
    ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Login: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Role: {
      type: "SET('ETUDIANT','PROFESSEUR','RESPONSABLE')",
      allowNull: false,
      defaultValue: 'Etudiant'
    },
    SectionName: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'Section',
        key: 'Name'
      }
    },
    ProjectID_Assigned: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Project',
        key: 'ID'
      },
      field: 'ProjectID_Assigned'
    }
  }, {
    tableName: 'User'
  });
  
  return User;
};
