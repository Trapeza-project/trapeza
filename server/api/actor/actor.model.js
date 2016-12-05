'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Actor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    basicinfo: DataTypes.STRING,
	description: DataTypes.STRING,
	branch: DataTypes.STRING,
	score: DataTypes.DOUBLE,
	responsible: DataTypes.STRING
  });
}
