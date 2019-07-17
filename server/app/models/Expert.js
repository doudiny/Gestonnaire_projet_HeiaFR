/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  Expert = sequelize.define('Expert', {
    ID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Expert'
  });

  return Expert;
};
