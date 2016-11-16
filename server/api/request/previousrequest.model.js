'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Previousrequest', {
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	infoids: DataTypes.STRING,
	timetolive: DataTypes.INTEGER,
	allow: DataTypes.BOOLEAN,
	companyapprove: DataTypes.BOOLEAN,
	companypending: DataTypes.BOOLEAN,
	data: DataTypes.TEXT
  });
}