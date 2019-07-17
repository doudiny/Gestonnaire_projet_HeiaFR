/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  Project = sequelize.define('Project', {
    ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    Abreviation: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    State: {
      type: "SET('SAISIE','VALIDATION','VALIDE','CONCOURS','ATTRIBUE','TERMINE', 'PUBLIE')",
      allowNull: false,
      defaultValue: 'Saisie'
    },
    NbrMaxStudent: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    Year: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    ClientName: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Language: {
      type: "SET('FRANCAIS','DEUTSCH','ENGLISH')",
      allowNull: true,
      defaultValue: 'Francais'
    },
    Public: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    UserID_Owner: {
      type: DataTypes.INTEGER(10),
      foreignKey: { // normally using "reference" but create depedency loop -> need to check if it still work with DB
        model: 'User',
        key: 'ID'
      }
    },
    TypeName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'Type',
        key: 'Name'
      }
    }
  }, {
      tableName: 'Project'
    });

  Project.associate = function (models) {
    models.Project.hasMany(models.User,
      {
        as: 'Student',
        foreignKey: 'ProjectID_Assigned'
      });
    models.Project.belongsToMany(models.Expert,
      {
        as: 'Experts',
        through: 'ExpertPerProject',
        foreignKey: 'ProjectID'
      })

    models.Project.belongsToMany(models.Externe,
      {
        as: 'RespExt',
        through: 'Externe_Project',
        foreignKey: 'ProjectID'
      })

    models.Project.belongsToMany(models.User,
      {
        as: 'RespInt',
        through: 'InCharge',
        foreignKey: 'ProjectID'
      })
    models.Project.belongsTo(models.User,
      {
        as: 'Owner',
        foreignKey: 'UserID_Owner',
        constraints: false,
      })
    models.Project.belongsToMany(models.LinkAndRef,
      {
        as: 'Link',
        through: 'LinkAndRefByProject',
        foreignKey: 'ProjectID'
      })

    models.Project.hasMany(models.Choices,
      {
        as: 'Choices',
        foreignKey: 'ProjectID'
      })
  }

  return Project;
};
