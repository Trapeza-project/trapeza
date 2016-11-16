'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Requestlog', {
	moduleid:DataTypes.INTEGER,
	requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	accessid: DataTypes.INTEGER,
	personid: DataTypes.INTEGER,
	infoids: { 
        type: DataTypes.STRING, 
    },
	pending: DataTypes.BOOLEAN,
	allow: DataTypes.BOOLEAN,
	companypending: DataTypes.BOOLEAN,
	companyallow: DataTypes.BOOLEAN,
	timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	purpose: DataTypes.STRING,
	price: DataTypes.DOUBLE
  });
}