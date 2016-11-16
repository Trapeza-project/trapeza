'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Infonames', {
    infoid: {
      type: DataTypes.INTEGER,
	  primaryKey: true,
      allowNull: false
    },
    infoname: DataTypes.STRING,
    infotype: DataTypes.STRING,
	price: DataTypes.DOUBLE
  });
}
