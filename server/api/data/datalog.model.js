'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Datalog', {
	personid: DataTypes.INTEGER,
	infoids: DataTypes.STRING,
	timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	provider: DataTypes.STRING,
	selfupload: DataTypes.BOOLEAN,
	validation: DataTypes.STRING
  });
};
