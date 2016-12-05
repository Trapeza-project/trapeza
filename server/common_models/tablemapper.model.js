'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Tablemapper', {
	infoid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
	column: DataTypes.STRING,
	table: DataTypes.STRING
  });
}
