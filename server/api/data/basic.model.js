'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Basic', {
	personid: DataTypes.INTEGER,
	firstname: DataTypes.STRING,
	lastname: DataTypes.STRING,
	address: DataTypes.STRING
  });
};
