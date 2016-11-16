'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Adminlog', {
	infoid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	username: DataTypes.STRING,
	timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
}
