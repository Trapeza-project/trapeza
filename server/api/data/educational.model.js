'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Educational', {
	personid: DataTypes.INTEGER,
	degree: DataTypes.STRING
  });
};
