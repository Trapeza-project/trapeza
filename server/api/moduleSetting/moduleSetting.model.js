'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Modulesettings', {
	moduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
	modulename: DataTypes.STRING,
	description: DataTypes.STRING,
	creatorid: DataTypes.INTEGER,
	infoids: DataTypes.STRING,
	active: DataTypes.BOOLEAN,
	UCHandle: DataTypes.BOOLEAN
  });
}
