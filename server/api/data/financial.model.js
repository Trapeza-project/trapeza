'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Financial', {
	personid: DataTypes.INTEGER,
	income: DataTypes.DOUBLE,
	allowance: DataTypes.DOUBLE,
	taxableIncome: DataTypes.DOUBLE,
	interestIncome: DataTypes.DOUBLE,
	pensionContribution: DataTypes.DOUBLE,
	benefits: DataTypes.DOUBLE,
	occupational: DataTypes.DOUBLE,
	business: DataTypes.DOUBLE,
	propertytax: DataTypes.DOUBLE
  });
};
