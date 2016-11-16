'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Financial', {
	personid: DataTypes.INTEGER,
	income: DataTypes.DOUBLE
  });
};
