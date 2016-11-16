'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Pendingrequest', {
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	accessid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	infoids: DataTypes.STRING,
	timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
}
